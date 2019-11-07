class DashBoard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: []
    };
  }

  componentDidMount() {
    axios.get('/dashboard-data', {})
    .then(response => {
      console.log(response);
      this.setState({data: response.data.scoreList})
      console.log(response.data.scoreList);
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  render() {
    const rows = this.state.data.map((score, key) =>
        <tr key={score._id}>
          <td scope="row">{score.nickName}</td>
          <td>{score.score}</td>
          <td>{msToTime(score.timetaken)}</td>
        </tr>
    );
    return (<div class="center-div" style={{ height: '600px' }}>
            <table className="table table-borderless">
            <caption>List of Score</caption>
              <thead>
                <tr>
                  <th scope="col">NickName</th>
                  <th scope="col">Score</th>
                  <th scope="col">Time Taken</th>
                </tr>
              </thead>
              <tbody>
                {rows}
              </tbody>
            </table>
        </div>
    );
  }
}

function msToTime(duration) {
  var milliseconds = parseInt((duration % 1000) / 100),
    seconds = Math.floor((duration / 1000) % 60),
    minutes = Math.floor((duration / (1000 * 60)) % 60),
    hours = Math.floor((duration / (1000 * 60 * 60)) % 24);

    hours = (hours < 10) ? "0" + hours : hours;
    minutes = (minutes < 10) ? "0" + minutes : minutes;
    seconds = (seconds < 10) ? "0" + seconds : seconds;

  return hours + ":" + minutes + ":" + seconds;
}
