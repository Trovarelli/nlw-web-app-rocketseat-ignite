import Axios from 'axios'

export const loadGames = async (_page: number, _gamesPerPage: number) => {
  const gamesOptions = {
    method: 'GET',
    url: 'https://rawg-video-games-database.p.rapidapi.com/games',
    headers: {
      'X-RapidAPI-Key': 'eb23abdb51msh2079a43f518c785p1acb5cjsndf049ad3f10b',
      'X-RapidAPI-Host': 'rawg-video-games-database.p.rapidapi.com'
    },
    params: {
      key: process.env.API_KEY,
      page_size: _gamesPerPage,
      page: _page,
      metacritic: '80,100'
    }
  };
  const gamesReturn = await Axios.request(gamesOptions).then(function (response: { data: any }) {
    const gamesResult = response.data.results

    const gamesIds = gamesResult.map((id: { id: number; }) => {
      return id.id
    })
    const adsReturn = Axios.get(`https://aps-api-nlw.herokuapp.com/api/anun/getAnuns?gameId=${gamesIds.join(',')}`).then(function (response: { data: any }) {
      const gamesAndAds = gamesResult.map((game: { id: any; name: any; background_image: any }) => {
        const adsOfGame = response.data.getAdsDb.filter((ad: { t_gameId: any; }) => {
          return ad.t_gameId === game.id
        })
        return {
          id: game.id,
          title: game.name,
          bannerUrl: game.background_image,
          _count: {
            ads: adsOfGame.length
          },
          ads: adsOfGame
        }
      })
      if (window.sessionStorage.getItem("games") !== null) {
        window.sessionStorage.setItem("page", JSON.stringify(_page))

        const gamesStorage = JSON.parse(window.sessionStorage.getItem("games")!)

        gamesAndAds.forEach((gameApi: any) => {
          if (!gamesStorage.some((item: { id: any; }) => gameApi.id ===item.id)) {
            gamesStorage.push(gameApi)
          } else {
            gamesStorage.forEach((gameStorage: {
              ads: any;
              _count: any; id: any;
            }) => {
              if (gameStorage.id === gameApi.id && gameStorage._count.ads !== gameApi._count.ads) {
                gameStorage._count.ads = gameApi._count.ads
                gameStorage.ads = gameApi.ads
              }
            })
          }
        });
        const gamesStorageSorted = gamesStorage.sort((n1: { _count: { ads: number } }, n2: { _count: { ads: number } }) => n2._count.ads - n1._count.ads)

        window.sessionStorage.setItem("games", JSON.stringify(gamesStorageSorted))

      } else {
        window.sessionStorage.setItem("games", JSON.stringify(gamesAndAds))
        window.sessionStorage.setItem("page", JSON.stringify(_page))
      }
      return gamesAndAds;
    }).catch(function (error: any) {
      console.error(error);
    });

    return adsReturn

  }).catch(function (error: any) {
    console.error(error);
  });

  return gamesReturn;
};
