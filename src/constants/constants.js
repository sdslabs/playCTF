import moment from "moment-timezone";
import store from "@/store/index";
import variables from "@/styles/main.scss";

export const notifPollingInterval = 10000;

export const colors = {
  barGraph: ["#55C39C", "#6269AB", "#59ABDA", "#81C1D6", "#6E8A8E"],
  pieChart: ["#B12BD2", "#FEC42C", "#5793F3", "#EA9311"],
  lineGraph: ["#22F80F", "#F80F55", "#0F6CF8"],
  singleBarGraph: [variables.themeColorDarkBlueHighTransp]
};
export const AdminLandingDetails = [
  {
    title: "What’s gonna be your competition’s name?",
    required: true,
    subtitle:
      "It’s recommended to be sweet, short and simple. It’ll be easier to announce."
  },
  {
    title: "When will the competition take place?",
    required: true,
    subtitle: "Once decided, this information cannot be changed"
  },
  {
    title: "Tell players about competition!",
    required: true,
    subtitle:
      "Provide us information about the CTF (It will be conveyed to the players)"
  },
  {
    title: "Want to have a logo?",
    required: false,
    subtitle:
      "Upload the logo of competition to be conveyed (in .jpg/.png/.svg format)"
  },
  {
    title: "Preview & Proceed",
    required: false,
    subtitle:
      "Preview the landing page you have made and proceed. You can update these things later in the configure page"
  }
];

export const getAllTimezones = () => {
  let timezones = moment.tz.names();
  let formattedTimezones = [];
  timezones.forEach(el => {
    formattedTimezones.push(`${el}: UTC ${moment.tz(el).format("Z")}`);
  });
  return formattedTimezones;
};

export const tableCols = {
  users: [
    {
      id: 1,
      label: "Rank",
      style: {
        width: "4.5rem",
        textAlign: "center"
      }
    },
    {
      id: 2,
      label: "User Name",
      style: {
        width: "7.5rem",
        paddingLeft: "1.25rem"
      }
    },
    {
      id: 3,
      label: "E-Mail Address",
      style: {
        textAlign: "left",
        paddingLeft: "2.5rem"
      }
    },
    {
      id: 4,
      label: "Score",
      style: {
        width: "4.5rem",
        textAlign: "center"
      }
    },
    {
      id: 5,
      label: "Status",
      style: {
        width: "4.5rem",
        textAlign: "center",
        paddingRight: "1.25rem"
      }
    }
  ],
  leaderboard: [
    {
      id: 1,
      label: "Rank",
      style: {
        textAlign: "center",
        width: "10%"
      }
    },
    {
      id: 2,
      label: "User Name",
      style: {
        width: "75%",
        paddingLeft: "2.5rem",
        textAlign: "left"
      }
    },
    {
      id: 3,
      label: "Score",
      style: {
        textAlign: "center",
        width: "15%"
      }
    }
  ],
  adminSumbissions: [
    {
      id: 1,
      label: "User Name",
      style: { paddingLeft: "2.5rem", textAlign: "left", width: "25%" }
    },
    {
      id: 2,
      label: "Challenge",
      style: { textAlign: "left", width: "25%", paddingLeft: "2.5rem" }
    },
    {
      id: 3,
      label: "Category",
      style: { textAlign: "center", width: "10%" }
    },
    {
      id: 4,
      label: "Time & Date (+5:30 UTC)",
      style: { paddingRight: "2.5rem", textAlign: "right", width: "40% " }
    }
  ],
  adminChallenge: [
    {
      id: 1,
      label: "User Name",
      style: { paddingLeft: "2.5rem", textAlign: "left", width: "40%" }
    },
    {
      id: 2,
      label: "Time & Date (+5:30 UTC)",
      style: { paddingRight: "2.5rem", textAlign: "right", width: "60% " }
    }
  ],
  user: [
    {
      id: 1,
      label: "Challenge",
      style: { textAlign: "left", width: "35%", paddingLeft: "2.5rem" }
    },
    {
      id: 2,
      label: "Category",
      style: { textAlign: "center", width: "20%" }
    },
    {
      id: 3,
      label: "Time & Date (+5:30 UTC)",
      style: { paddingRight: "2.5rem", textAlign: "right", width: "45%" }
    }
  ]
};

export const confimDialogMessages = chalName => {
  return {
    adminChallenge: {
      purge: {
        title: "Purge this Challenge?",
        message: `Action will pause the participation of players.`,
        button: {
          yes: "Purge",
          no: "Cancel"
        }
      },
      deploy: {
        title: "Deploy this Challenge?",
        message: `The challenge would go live after this action. The players would be able to attempt this challenge.`,
        button: {
          yes: "Deploy",
          no: "Cancel"
        }
      },
      undeploy: {
        title: "Undeploy this Challenge?",
        message: `The challenge ${chalName} will be marked as "Down for maintenance" after this section.`,
        button: {
          yes: "Undeploy",
          no: "Cancel"
        }
      }
    },
    user: {
      ban: {
        title: "Want to ban this player?",
        message: `Action will pause participation of player.`,
        button: {
          yes: "Ban",
          no: "Cancel"
        }
      },
      unban: {
        title: "Remove ban from this player?",
        message: `The action will resume participation of player.`,
        button: {
          yes: "Remove ban",
          no: "Cancel"
        }
      }
    }
  };
};

export const pieChartOptions = () => {
  return {
    plugins: {
      datalabels: {
        formatter: (value, ctx) => {
          let sum = 0;
          let dataArr = ctx.chart.data.datasets[0].data;
          dataArr.map(data => {
            sum += data;
          });
          let percentage = ((value * 100) / sum).toFixed(0) + "%";
          return percentage;
        },
        color: "#fff",
        font: {
          size: 12,
          weight: "bold"
        }
      }
    },
    cutoutPercentage: 35,
    tooltips: {
      callbacks: {
        title: function(tooltipItem, data) {
          return data["labels"][tooltipItem[0]["index"]];
        },
        label: function(tooltipItem, data) {
          let sum = 0;
          let dataArr = data.datasets[0].data;
          dataArr.forEach(el => {
            sum += el;
          });
          let correct = data["datasets"][0]["data"][tooltipItem["index"]];
          let message = `${correct} Correct, ${((correct / sum) * 100).toFixed(
            2
          )}%`;
          return message;
        }
      },
      displayColors: false,
      backgroundColor: `#000000`,
      color: "#FFFFFF",
      bodyFontFamily: "Nunito Sans"
    },
    hoverBorderWidth: 20,
    responsive: true,
    maintainAspectRatio: true,
    legend: {
      position: "right",
      labels: {
        boxWidth: 20
      }
    }
  };
};

export const barChartOptions = () => {
  let containerProps = {
    responsive: true,
    tooltips: {
      callbacks: {
        title(tooltipItem, data) {
          return data["labels"][tooltipItem[0]["index"]];
        },
        label(tooltipItem, data) {
          let correctPercentage =
            data["datasets"][0]["data"][tooltipItem["index"]];
          return `${correctPercentage}%`;
        }
      },
      displayColors: false,
      backgroundColor: `#000000`,
      color: "#FFFFFF",
      bodyFontFamily: "Nunito Sans"
    },
    maintainAspectRatio: true,
    legend: {
      display: false
    }
  };
  let gridProps = {
    color: variables.themeColorGrey57,
    drawOnChartArea: false
  };

  let supportAxisProps = [
    {
      gridLines: gridProps
    }
  ];
  return {
    challenges: {
      ...containerProps,
      layout: {
        padding: {
          top: 50
        }
      },
      plugins: {
        datalabels: {
          formatter: (value, ctx) => {
            let percentage = value + "%";
            return percentage;
          },
          font: {
            size: 12,
            weight: "normal"
          },
          color: "#191919",
          anchor: "end",
          align: "top"
        }
      },
      scales: {
        yAxes: [
          {
            gridLines: gridProps,
            scaleLabel: {
              display: true,
              labelString: "Solve Percentages(%)"
            },
            fontColor: "#191919",
            ticks: {
              stepSize: 33,
              min: 0,
              max: 100
            }
          }
        ],
        xAxes: supportAxisProps
      }
    },
    statistics: {
      ...containerProps,
      plugins: {
        datalabels: {
          formatter: (value, ctx) => {
            let percentage = value + "%";
            return percentage;
          },
          font: {
            size: 12,
            weight: "normal"
          },
          color: "#191919",
          anchor: "end",
          align: "right"
        }
      },
      layout: {
        padding: {
          right: 50
        }
      },
      scales: {
        xAxes: [
          {
            gridLines: gridProps,
            ticks: {
              stepSize: 20,
              min: 0,
              max: 100,
              fontColor: variables.themeColorGrey39,
              fontFamily: "Roboto",
              fontStyle: "normal"
            },
            scaleLabel: {
              display: true,
              labelString: "Solve Percentage"
            }
          }
        ]
      },
      yAxes: supportAxisProps
    }
  };
};

export const lineGraphOptions = showLegend => {
  let legend, tooltips;
  if (showLegend) {
    legend = {
      display: true,
      position: "top",
      labels: {
        fontFamily: "Nunito Sans",
        fontColor: variables.themeColorBlack19,
        fontSize: 12,
        lineHeight: 12,
        boxWidth: 20
      }
    };
    tooltips = {
      callbacks: {
        title(data, tooltipItem) {
          let title = "";
          data.forEach((el, index) => {
            let playerInfo = tooltipItem.datasets[el.datasetIndex].label;
            let playerData = playerInfo.split(" ");
            title += `${playerData[0]}; ${playerData[1].substring(1, 4)} Rank`;
            if (index !== data.length - 1) {
              title += " & ";
            }
          });
          return title;
        },
        label: function(data, tooltipItem) {
          let time = moment(data["xLabel"], "MMM DD, YYYY, hh:mm:ss a");
          let value = time.format("MMMM DD, YYYY; HH:mm:ss, ") + data["value"];
          console.log(value);
          return value;
        }
      },
      displayColors: false,
      backgroundColor: `#000000`,
      color: "#FFFFFF",
      bodyFontFamily: "Nunito Sans"
    };
  } else {
    legend = {
      display: false
    };
    tooltips = {
      mode: "index",
      intersect: false,
      callbacks: {
        title: function(data, tooltipItem) {
          let time = moment(data[0]["xLabel"], "MMM DD, YYYY, hh:mm:ss a");
          return time.format("MMMM DD, YYYY; HH:mm:ss");
        }
      },
      displayColors: false,
      backgroundColor: `#000000`,
      color: "#FFFFFF",
      bodyFontFamily: "Nunito Sans"
    };
  }
  return {
    tooltips,
    layout: {
      padding: 20
    },
    legend,
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      datalabels: {
        formatter: () => {
          return "";
        }
      }
    },
    scales: {
      xAxes: [
        {
          type: "time",
          distribution: "linear",
          time: {
            unit: "hour",
            displayFormats: {
              hour: "HH:mm"
            },
            stepSize: Math.floor(
              moment
                .duration(
                  moment(
                    store.state.competitionInfo.endingTime,
                    "HH:mm:ss UTC: Z, Do MMMM YYYY, dddd"
                  ).diff(
                    moment(
                      store.state.competitionInfo.startingTime,
                      "HH:mm:ss UTC: Z, Do MMMM YYYY, dddd"
                    )
                  )
                )
                .asHours() / 10
            )
          },
          gridLines: {
            color: variables.themeColorGrey57,
            drawOnChartArea: false
          },
          scaleLabel: {
            display: false
          },
          ticks: {
            fontColor: variables.themeColorGrey39,
            fontFamily: "Roboto",
            fontStyle: "normal",
            min:
              moment(
                store.state.competitionInfo.startingTime,
                "HH:mm:ss UTC: Z, Do MMMM YYYY, dddd"
              ).unix() * 1000,
            max:
              moment(
                store.state.competitionInfo.endingTime,
                "HH:mm:ss UTC: Z, Do MMMM YYYY, dddd"
              ).unix() * 1000
          }
        },
        {
          type: "time",
          distribution: "linear",
          time: {
            unit: "day",
            displayFormats: {
              day: "Do MMMM YYYY"
            },
            stepSize: 1
          },
          gridLines: {
            color: variables.themeColorGreyHighTransp,
            drawOnChartArea: false
          },
          scaleLabel: {
            display: true,
            labelString: "Time"
          },
          ticks: {
            fontColor: variables.themeColorGreyHighTransp,
            fontFamily: "Roboto",
            fontStyle: "normal",
            min:
              moment(
                store.state.competitionInfo.startingTime,
                "HH:mm:ss UTC: Z, Do MMMM YYYY, dddd"
              ).unix() * 1000,
            max:
              moment(
                store.state.competitionInfo.endingTime,
                "HH:mm:ss UTC: Z, Do MMMM YYYY, dddd"
              ).unix() * 1000
          }
        }
      ],
      yAxes: [
        {
          scaleLabel: {
            display: true,
            labelString: "Score"
          },
          gridLines: {
            color: variables.themeColorGrey57,
            drawOnChartArea: false
          },
          ticks: {
            source: "auto",
            fontColor: variables.themeColorGrey39,
            fontFamily: "Roboto",
            fontStyle: "normal",
            min: 0
          }
        }
      ]
    }
  };
};

export const lineGraphConfig = {
  lineTension: 0,
  pointRadius: 5,
  borderWidth: 1,
  fill: false,
  singleLineConfig: {
    backgroundColor: variables.themeColorWhite,
    borderColor: "#0F6CF8"
  }
};
