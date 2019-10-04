import ReactDOM from "react-dom";
import React from "react";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bloggersList: [],
      votes: {}
    };
    this.authFunc = this.authFunc.bind(this);
  }

  componentWillMount() {
    fetch(`/api/bloggers`)
      .then(res => res.json())
      .then(body => {
        this.setState({ bloggersList: body.items });
      });

    fetch(`/api/votes`)
      .then(res => res.json())
      .then(body => {
        const votes = body.reduce(function(acc, item) {
          if (acc[item.value]) {
            acc[item.value] += 1;
          } else {
            acc[item.value] = 1;
          }

          return acc;
        }, {});
        this.setState({ votes });
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

  handleVote(bloggerId) {
    const txData = {
      type: 16,
      data: {
        fee: {
          tokens: "0.05",
          assetId: "WAVES"
        },
        dApp: "3NCNoPsUGinvErayNYFzNfDYSbDA8gFzA3d",
        call: {
          function: "vote",
          args: [
            {
              type: "string",
              value: bloggerId
            }
          ]
        },
        payment: []
      }
    };
    window.WavesKeeper.signAndPublishTransaction(txData)
      .then(data => {
        console.log(data);
      })
      .catch(error => {
        console.error(error);
      });
  }

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
                  — {this.state.votes[blogger.id]}
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
