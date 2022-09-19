import  Axios  from 'axios'

export const loadGames = async (_page: number, _gamesPerPage: number) => {
    const options = {
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
        }
      };
  
      const gamesReturn = await Axios.request(options).then(function (response: { data: any }) {
        const gamesResult = response.data.results
        const games = gamesResult.map((game: { id: any; name: any; background_image: any }) => {
          return {
            id: game.id,
            title: game.name,
            bannerUrl: game.background_image,
            _count: {
              ads: 0
            }
          }
        })
        return games;
      }).catch(function (error: any) {
        console.error(error);
      });

      return gamesReturn
  };
  