export interface State {
  // active game:
  team1Score: number;
  team2Score: number;

  // game setup:
  targetScore: number;
  overGoBack: number;

  // appearance:
  bag1Color: string;
  bag1TextColor: string;
  bag2Color: string;
  bag2TextColor: string;
}

export const initialState: State = {
  team1Score: 0,
  team2Score: 0,
  
  targetScore: 21,
  overGoBack: 15,

  bag1Color: '#ccc',
  bag1TextColor: '#111',
  bag2Color: '#111',
  bag2TextColor: '#ccc'
}
