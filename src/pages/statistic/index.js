import React, { useState, useEffect } from "react";
import AWS from 'aws-sdk';
import { Auth, API, DataStore } from 'aws-amplify';
import { useAuthenticator } from '@aws-amplify/ui-react';
import { Chart, initTE } from "tw-elements";
import { Skills } from '../../models';
import Alert from "../../components/alerts";
import CalculateAge from "../../functions/User";

const dataBarHorizontal = {
    type: "bar",
    data: {
        labels: [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
        ],
        datasets: [
            {
                label: "Themen",
                data: [30, 15, 62, 65, 61, 65, 77, 30, 15, 62, 65, 61, 65, 77, 15, 62, 65, 61, 65, 77],
                backgroundColor: [
                    'rgba(15, 118, 110, 1)'
                ],
            },
        ],
    },
};
  
const optionsBarHorizontal = {
    options: {
      indexAxis: "y",
      scales: {
        x: {
          stacked: true,
          grid: {
            display: false,
            borderDash: [2],
            zeroLineColor: "rgba(0,0,0,0)",
            zeroLineBorderDash: [2],
            zeroLineBorderDashOffset: [2],
          },
          ticks: {
            color: "rgba(0,0,0, 0.5)",
          },
        },
        y: {
          stacked: true,
          grid: {
            display: true,
          },
          ticks: {
            color: "rgba(0,0,0, 0.5)",
          },
        },
      },
    },
};

function Subscriber({teilnehmer}) {
    const [skillsNr, setSkillsNr] = useState(0);
  
    useEffect(() => {
      (async () => {
        await DataStore.query(Skills, (c) => c.and(c => [
          c.teilnehmer.eq(teilnehmer.Username),
          c.state.eq(1)
        ])).then(function(result) {
          setSkillsNr(result.length);
        });
      })();
    }, [teilnehmer]);
  
    return (
      skillsNr > 0 && (
        <div className="w-full p-4 sm:w-1/2 lg:w-1/3 xl:w-1/4 2xl:w-1/5">
            <div className="flex items-center justify-center px-5 py-3 bg-slate-200 sm:flex-row">
                <div className="flex-grow">
                    <h2 className="text-lg font-medium text-gray-900 title-font">{teilnehmer.Attributes[3].Value} {teilnehmer.Attributes[4].Value.substring(0, 1)}.</h2>
                    <p className="-mt-1 text-sm font-light leading-relaxed"><CalculateAge birthdate={teilnehmer.Attributes[1].Value} /> Jahre alt</p>
                </div>
                <div className="inline-flex items-center justify-center px-3 ml-auto text-sm font-semibold text-gray-500 bg-white w-fit h-9 sm:flex-col">
                    <div className=''>{skillsNr} Themen gelernt</div>
                </div>
            </div>
        </div>
      )
    )
}


function Statistic() {
    const [users, setUsers] = useState([]);
    const [usersLoaded, setUsersLoaded] = useState(false);
    const { route } = useAuthenticator((context) => [context.route]);
    
    // initTE({ Chart });
    // new Chart(
    //   document.getElementById("bar-chart-horizontal"),
    //   dataBarHorizontal,
    //   optionsBarHorizontal
    // );

    const getUsers = async () => {
      try {
        let allUsers = [];
        let more = true;
        let paginationToken = '';
        setUsersLoaded(false);

        while (more) {
          let params = {
            UserPoolId: "eu-central-1_5DnUlAAXB",
            Limit: 60
          };
          if (paginationToken !== '') {
            params.PaginationToken = paginationToken;
          }

          AWS.config.update({
            region: "eu-central-1",
            accessKeyId: "AKIAV2T7ZGLIKAM2OM4L",
            secretAccessKey: "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"
          });
          const cognito = new AWS.CognitoIdentityServiceProvider();
          const rawUsers = await cognito.listUsers(params).promise();
          allUsers = allUsers.concat(rawUsers.Users);
          if (allUsers.length > 0) {
            setUsersLoaded(true);
          }
          // console.log(allUsers);
          if (rawUsers.PaginationToken) {
            paginationToken = rawUsers.PaginationToken;
          } else {
            more = false;
          }
        }
        setUsers(allUsers);
      } catch (e) {
        console.log(e);
      }
    };

    useEffect(() => {
      getUsers();
    }, []);

    return (
        <div className="w-full Statistic">
            <h1 className="uppercase">TOP 20 TEILNEHMER</h1>
            <div className="w-full mx-auto mb-10 overflow-hidden xl:w-2/3">
                {/* <canvas id="bar-chart-horizontal"></canvas> */}
            </div>
            
            {usersLoaded && (
              <>
              <h1 className="uppercase">Alle TEILNEHMER ({users.length})</h1>

              <div className="flex flex-wrap mb-10 -m-4">
              {users.map(teilnehmer => <Subscriber teilnehmer={teilnehmer} />)}
              </div>
              </>
            )}

            {route !== 'authenticated' && <Alert type="info" title="Willst Du mitmachen?" content="Jetzt sich registrieren und direkt miteinsteigen." navigate="/login" button="Anmelden" />}
        </div>
    );
}

export default Statistic;