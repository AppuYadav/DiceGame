class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      userName: null,
      password: null,
      nickName: null,
      errors: {
        userName: '',
        password: '',
        nickName: ''
      }
    };

    this.login = this.login.bind(this);
  }

  handleChange = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    // let errors = this.state.errors;
    let errorMessage = "";

    switch (name) {
      case 'userName':
        errorMessage =
          value.length < 5
            ? 'User Name must be 5 characters long!'
            : '';
        break;

      case 'nickName':
        errorMessage =
          value.length < 1
            ? 'Nick Name not empty!'
            : '';
        break;

      case 'password':
        errorMessage =
          value.length < 6
            ? 'Password must be 6 characters long!'
            : '';
        break;

      default:
        break;
    }

    this.setState(prevState => ({
      errors: {
        ...prevState.errors,
          [name]: errorMessage,
      },
      [name]: value,
    }));
  }

  login() {
    event.preventDefault();
    let errors = this.state.errors;
    if(event.target.userName.value.length < 5){
      this.setState(prevState => ({
        errors: {
          ...prevState.errors,
            'userName': 'User Name must be 5 characters long!'
        }
      }));
    }

    if(event.target.nickName.value.length < 1){
      this.setState(prevState => ({
        errors: {
          ...prevState.errors,
            'nickName': 'Nick Name not empty!'
        }
      }));
    }

    if(event.target.password.value.length < 6){
      this.setState(prevState => ({
        errors: {
          ...prevState.errors,
            'password': 'Password must be 6 characters long!'
        }
      }));
    }

    if(validateForm(this.state.errors)) {
       axios.post('/login', {
          userName: event.target.userName.value,
          password: event.target.password.value,
          nickName: event.target.nickName.value
        })
        .then(function (response) {
          console.log(response);
          if (typeof(Storage) !== "undefined") {
              sessionStorage.userName = response.data.userInfo.userName;
              sessionStorage.nickName = response.data.userInfo.nickName;
              sessionStorage.role = response.data.userInfo.role;
              if(response.data.userInfo.role == 'admin'){
                window.location.href = '/dashboard';
              }else{
                window.location.href = '/game';
              }
          } else {
            document.getElementById("root").innerHTML = "Sorry, your browser does not support web storage...";
          }
          {/* ReactDOM.render(
    				<Game />,
    				document.getElementById('root')
    			); */}
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  }

  render() {
    const errors = this.state.errors;
    return (<div class="center-div" id="root">
              <form onSubmit={this.login} noValidate>
                  <div className="form-group row">
                    <label for="inputPassword" className="col-sm-2 col-form-label">Username</label>
                    <div className="col-sm-10">
                      <input type="text" className="form-control" id="inputUsername" name="userName" onChange={this.handleChange} noValidate/>
                      {errors.userName.length > 0 && <span className='error'>{errors.userName}</span>}
                    </div>
                  </div>

                  <div className="form-group row">
                    <label for="inputPassword" className="col-sm-2 col-form-label">Password</label>
                    <div className="col-sm-10">
                      <input type="password" className="form-control" id="inputPassword" name="password" onChange={this.handleChange} noValidate/>
                      {errors.password.length > 0 && <span className='error'>{errors.password}</span>}
                    </div>
                  </div>

                  <div className="form-group row">
                    <label for="inputPassword" className="col-sm-2 col-form-label">Nickname</label>
                    <div className="col-sm-10">
                      <input type="text" className="form-control" id="inputNickname" name="nickName" onChange={this.handleChange} noValidate/>
                      {errors.nickName.length > 0 && <span className='error'>{errors.nickName}</span>}
                    </div>
                  </div>
                  <button type="submit" className="btn btn-outline-dark float-right" style={{ marginTop: '30px' }}>LOG IN</button>
              </form>
        </div>
    );
  }
}

const validateForm = (errors) => {
  let valid = true;
  Object.values(errors).forEach(
    (val) => val.length > 0 && (valid = false)
  );
  return valid;
}
