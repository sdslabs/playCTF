export const tableCols = {
  adminSumbissions: [
    {
      id: 1,
      label: 'User Name',
      style: { paddingLeft: '40px', textAlign: 'left', width: '25%' },
    },
    {
      id: 2,
      label: 'Challenge',
      style: { textAlign: 'left', width: '25%', paddingLeft: '40px' },
    },
    {
      id: 3,
      label: 'Category',
      style: { textAlign: 'center', width: '10%' },
    },
    {
      id: 4,
      label: 'Time & Date (+5:30 UTC)',
      style: { paddingLeft: '20px', textAlign: 'left', width: '40% ' },
    },
  ],
  adminChallenge: [
    {
      id: 1,
      label: 'User Name',
      style: { paddingLeft: '40px', textAlign: 'left', width: '40%' },
    },
    {
      id: 2,
      label: 'Time & Date (+5:30 UTC)',
      style: { paddingRight: '40px', textAlign: 'right', width: '60% ' },
    },
  ],
}

export const confimDialogMessages = (chalName) => {
  return {
    adminChallenge: {
      purge: {
        title: 'Purge this Challenge?',
        message: `Action will pause the participation of players.`,
        button: {
          yes: 'Purge',
          no: 'Cancel',
        },
      },
      deploy: {
        title: 'Deploy this Challenge?',
        message: `The challenge would go live after this action. The players would be able to attempt this challenge.`,
        button: {
          yes: 'Deploy',
          no: 'Cancel',
        },
      },
      undeploy: {
        title: 'Undeploy this Challenge?',
        message: `The challenge ${chalName} will be marked as "Down for maintenance" after this section.`,
        button: {
          yes: 'Undeploy',
          no: 'Cancel',
        },
      },
    },
  }
}

export const barChartOptions = () => {
  return {
    responsive: true,
    maintainAspectRatio: true,
    legend: {
      display: false,
    },
    scales: {
      yAxes: [
        {
          gridLines: {
            color: '#575757',
            drawOnChartArea: false,
          },
          scaleLabel: {
            display: true,
            labelString: 'Solve %',
          },
          ticks: {
            stepSize: 33,
            min: 0,
            max: 100,
          },
        },
      ],
    },
    xAxes: [
      {
        gridLines: {
          color: '#575757',
          drawOnChartArea: false,
        },
      },
    ],
  }
}
