export const colors = {
  barGraph: ["#55C39C", "#6269AB", "#59ABDA", "#81C1D6", "#6E8A8E"],
  pieChart: ["#B12BD2", "#FEC42C", "#5793F3", "#EA9311"],
  lineGraph: ["#22F80F", "#F80F55", "#0F6CF8"],
  singleBarGraph: ["rgba(76, 128, 165, 0.75)"]
};

export const tableCols = {
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
        paddingLeft: "40px",
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
      style: { paddingLeft: "40px", textAlign: "left", width: "25%" }
    },
    {
      id: 2,
      label: "Challenge",
      style: { textAlign: "left", width: "25%", paddingLeft: "40px" }
    },
    {
      id: 3,
      label: "Category",
      style: { textAlign: "center", width: "10%" }
    },
    {
      id: 4,
      label: "Time & Date (+5:30 UTC)",
      style: { paddingLeft: "20px", textAlign: "left", width: "40% " }
    }
  ],
  adminChallenge: [
    {
      id: 1,
      label: "User Name",
      style: { paddingLeft: "40px", textAlign: "left", width: "40%" }
    },
    {
      id: 2,
      label: "Time & Date (+5:30 UTC)",
      style: { paddingRight: "40px", textAlign: "right", width: "60% " }
    }
  ],
  user: [
    {
      id: 1,
      label: "Challenge",
      style: { textAlign: "left", width: "35%", paddingLeft: "40px" }
    },
    {
      id: 2,
      label: "Category",
      style: { textAlign: "center", width: "20%" }
    },
    {
      id: 3,
      label: "Time & Date (+5:30 UTC)",
      style: { paddingRight: "40px", textAlign: "right", width: "45%" }
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
    maintainAspectRatio: true,
    legend: {
      display: false
    }
  };
  let gridProps = {
    color: "#575757",
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
      scales: {
        yAxes: [
          {
            gridLines: gridProps,
            scaleLabel: {
              display: true,
              labelString: "Solve %"
            },
            ticks: {
              stepSize: 33,
              min: 0,
              max: 100
            }
          }
        ]
      },
      xAxes: supportAxisProps
    },
    statistics: {
      ...containerProps,
      scales: {
        xAxes: [
          {
            gridLines: gridProps,
            ticks: {
              stepSize: 20,
              min: 0,
              max: 100,
              fontColor: "#393939",
              fontFamily: "Roboto",
              fontStyle: "normal"
            },
            scaleLabel: {
              display: true,
              labelString: "Solve %"
            }
          }
        ]
      },
      yAxes: supportAxisProps
    }
  };
};

export const lineGraphOptions = showLegend => {
  let legend;
  if (showLegend) {
    legend = {
      display: true,
      position: "top",
      labels: {
        fontFamily: "Nunito Sans",
        fontColor: "#191919",
        fontSize: 12,
        lineHeight: 12,
        boxWidth: 20
      }
    };
  } else {
    legend = {
      display: false
    };
  }
  return {
    layout: {
      padding: 10
    },
    legend,
    responsive: true,
    maintainAspectRatio: true,
    scales: {
      xAxes: [
        {
          gridLines: {
            color: "#575757",
            drawOnChartArea: false
          },
          scaleLabel: {
            display: true,
            labelString: "Time"
          },
          ticks: {
            source: "auto",
            fontColor: "#393939",
            fontFamily: "Roboto",
            fontStyle: "normal"
          },
          type: "time",
          distribution: "linear",
          time: {
            unit: "hour"
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
            color: "#575757",
            drawOnChartArea: false
          },
          ticks: {
            source: "auto",
            fontColor: "#393939",
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
    backgroundColor: "white",
    borderColor: "#0F6CF8"
  }
};
