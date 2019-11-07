class Game extends React.Component {
  constructor(props) {
    super(props);
    sessionStorage.time = Date.now();
    this.state = {
      diceValue: 1,
      enabled: true,
      diceImage: '/images/1.png',
      diceThrowCount: sessionStorage.diceThrowCount != undefined ? sessionStorage.diceThrowCount : 0
    };
    console.log(sessionStorage.time);
  }

  diceClick = () => {
    if (typeof(Storage) !== "undefined") {
       const diceValue = Math.floor(1 + Math.random()*(6 + 1 - 1));
       if (sessionStorage.diceThrowCount) {
         sessionStorage.diceThrowCount = Number(sessionStorage.diceThrowCount)+1;
       } else {
         sessionStorage.gameId = (S4() + S4() + "-" + S4() + "-4" + S4().substr(0,3) + "-" + S4() + "-" + S4() + S4() + S4()).toLowerCase();
         sessionStorage.diceThrowCount = 1;
       }

       const diceImage = `/images/${diceValue}.png`;
       this.setState(prevState => ({
         diceValue: diceValue,
         diceImage: diceImage,
         enabled: false,
         diceThrowCount: sessionStorage.diceThrowCount
       }));

       if(sessionStorage.diceThrowCount > 3){
         sessionStorage.removeItem("diceThrowCount");
         sessionStorage.removeItem("gameId");
         ReactDOM.render(
           <ThankYou />,
           document.getElementById('root')
         );
       }else{
         setTimeout(() => {
           axios.post('/game', {
              userName: sessionStorage.userName,
              score: diceValue,
              nickName: sessionStorage.nickName,
              gameId: sessionStorage.gameId,
              timetaken: (Date.now() - sessionStorage.time)
            })
            .then(response => {
              sessionStorage.time = Date.now();
              console.log(response);
              this.setState({
                enabled: true,
              });
            })
            .catch(function (error) {
              console.log(error);
            });
         }, 5000);
       }
    } else {
       document.getElementById("result").innerHTML = "Sorry, your browser does not support web storage...";
    }
  }

  render() {
    return (<div class="center-div" style={{ height: '500px' }}>
            <div style={{
              textAlign: 'center',
              fontSize: '18px',
              letterSpacing: '0.5px' }}>
              Game {this.state.diceThrowCount}/3
            </div>

            <img src={this.state.diceImage} alt="Paris" className="center game-image" />

            <button
            disabled={!this.state.enabled}
            type="button"
            onClick= {this.diceClick}
            className="btn btn-outline-dark center"
            style={{ marginTop: '80px' }}>
              RANDOM
            </button>
        </div>
    );
  }
}

function S4() {
    return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
}
