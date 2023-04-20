import Alert from "../../components/alerts";
import { useAuthenticator } from '@aws-amplify/ui-react';
import { Chart, initTE } from "tw-elements";

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
  

function Statistic() {
    const { route } = useAuthenticator((context) => [context.route]);
    
    initTE({ Chart });
    new Chart(
        document.getElementById("bar-chart-horizontal"),
        dataBarHorizontal,
        optionsBarHorizontal
    );

    return (
        <div className="w-full Statistic">
            <h1 className="uppercase">TOP 20 TEILNEHMER</h1>
            <div className="w-full mx-auto mb-10 overflow-hidden xl:w-2/3">
                <canvas id="bar-chart-horizontal"></canvas>
            </div>
            
            <h1 className="uppercase">Alle TEILNEHMER (44)</h1>

            <div className="flex flex-wrap mb-5 -m-4">
                <div className="w-full p-4 sm:w-1/2 lg:w-1/3 xl:w-1/4 2xl:w-1/5">
                    <div className="flex items-center justify-center px-5 py-3 bg-slate-200 sm:flex-row">
                        <div className="flex-grow">
                            <h2 className="text-lg font-medium text-gray-900 title-font">Sahm A.</h2>
                            <p className="-mt-1 text-sm font-light leading-relaxed">14 Jahre alt</p>
                        </div>
                        <div className="inline-flex items-center justify-center px-3 ml-auto text-sm font-semibold text-gray-500 bg-white w-fit h-9 sm:flex-col">
                            <div className=''>66 Themen gelernt</div>
                        </div>
                    </div>
                </div>
                <div className="w-full p-4 sm:w-1/2 lg:w-1/3 xl:w-1/4 2xl:w-1/5">
                    <div className="flex items-center justify-center px-5 py-3 bg-slate-200 sm:flex-row">
                        <div className="flex-grow">
                            <h2 className="text-lg font-medium text-gray-900 title-font">Jabir A.</h2>
                            <p className="-mt-1 text-sm font-light leading-relaxed">13 Jahre alt</p>
                        </div>
                        <div className="inline-flex items-center justify-center px-3 ml-auto text-sm font-semibold text-gray-500 bg-white w-fit h-9 sm:flex-col">
                            <div className=''>51 Themen gelernt</div>
                        </div>
                    </div>
                </div>
                <div className="w-full p-4 sm:w-1/2 lg:w-1/3 xl:w-1/4 2xl:w-1/5">
                    <div className="flex items-center justify-center px-5 py-3 bg-slate-200 sm:flex-row">
                        <div className="flex-grow">
                            <h2 className="text-lg font-medium text-gray-900 title-font">Jabir A.</h2>
                            <p className="-mt-1 text-sm font-light leading-relaxed">13 Jahre alt</p>
                        </div>
                        <div className="inline-flex items-center justify-center px-3 ml-auto text-sm font-semibold text-gray-500 bg-white w-fit h-9 sm:flex-col">
                            <div className=''>51 Themen gelernt</div>
                        </div>
                    </div>
                </div>
            </div>

            {route !== 'authenticated' && <Alert type="info" title="Willst Du mitmachen?" content="Jetzt sich registrieren und direkt miteinsteigen." navigate="/login" button="Anmelden" />}
        </div>
    );
}

export default Statistic;