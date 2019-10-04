import ReactDOM from "react-dom";
import React from "react";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bloggersList: []
    };
    this.authFunc = this.authFunc.bind(this);
  }

  componentWillMount() {
    fetch(`/api/bloggers`)
      .then(res => res.json())
      .then(body => {
        this.setState({ bloggersList: body.items });
      });
  }

  authFunc() {
    const authData = { data: "IT Bloggers Contest" };
    if (window.WavesKeeper) {
      window.WavesKeeper.auth(authData)
        .then(auth => {
          console.log(auth);
        })
        .catch(error => {
          console.error(error);
        });
    } else {
      alert("Пожалуйста, установите WavesKeeper.");
    }
  }

  handleVote(bloggerId) {}
  handleReset() {}

  render() {
    return (
      <div className="container">
        <div className="jumbotron mt-4">
          <h1 className="display-4">Лучший АйТи блоггер!</h1>
          <p className="lead">
            Голосуй за лучшего айти блоггера! Победитель не получит ничего!
          </p>
          <hr className="my-4" />
          <p>
            Голосование открытое на блокчейн платформе Waves. Чтобы голосовать
            установи{" "}
            <a href="https://docs.wavesplatform.com/en/waves-keeper/about-waves-keeper.html">
              WaveKeeper
            </a>
            .
          </p>
          <p className="lead">
            <button
              className="btn btn-primary"
              type="button"
              onClick={this.authFunc}
            >
              Авторизовать WaveKeeper
            </button>
          </p>
        </div>

        <ul className="list-unstyled">
          {this.state.bloggersList.map(blogger => (
            <li className="media my-3">
              <img
                className="mr-3 img-thumbnail"
                src={blogger.snippet.thumbnails.default.url}
              />
              <div className="media-body">
                <h5 className="mt-0 mb-2">
                  <a href={`https://www.youtube.com/channel/${blogger.id}`}>
                    {blogger.snippet.title}
                  </a>
                </h5>
                <input
                  className="btn btn-light"
                  type="button"
                  value="Голосовать!"
                  onClick={this.handleVote.bind(null, blogger.id)}
                />
              </div>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

const app = document.getElementById("app");
if (app) {
  ReactDOM.render(<App />, app);
}
