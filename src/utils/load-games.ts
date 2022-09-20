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
    const adsReturn = Axios.get(`https://aps-api-nlw.herokuapp.com/ads/${gamesIds.join(',')}`).then(function (response: { data: any }) {
      const gamesAndAds = gamesResult.map((game: { id: any; name: any; background_image: any }) => {
          const adsOfGame = response.data.filter((ad: { gameId: any; }) => {
            return ad.gameId === game.id
          })
          return {
            id: game.id,
            title: game.name,
            bannerUrl: game.background_image,
            _count: {
              ads: adsOfGame.length
            }
          }
      })
      return gamesAndAds;
    }).catch(function (error: any) {
      console.error(error);
    });

    return adsReturn

  }).catch(function (error: any) {
    console.error(error);
  });

  window.sessionStorage.setItem("games", JSON.stringify(gamesReturn))
  return gamesReturn;
};
