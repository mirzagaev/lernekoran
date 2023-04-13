import React, { useState, useEffect } from "react";
import { Quran } from '../../models';
import { Amplify, DataStore } from 'aws-amplify';
import config from '../../aws-exports';
import Alert from "../../components/alerts";
Amplify.configure(config);


function SkillsContainer({username}) {
    const [suran, setSuran] = useState([]);
    
    async function fetchData() {
        setSuran(await DataStore.query(Quran));
    }

    useEffect(() => {
        fetchData();
        const subscription = DataStore.observe(Quran).subscribe(() =>
            fetchData()
        );
        return () => subscription.unsubscribe();
    });

    return (
        <div className="Skills">
            <h1>{username} hat 49 Themen gelernt</h1>

            {!suran.length && <Alert type="warning" title="Laden fehlgeschlagen" content="Suran konnten nicht geladen werden" />}

            <div class="flex flex-wrap -m-4">
            {suran.map(sura => (
                <div class="p-2 md:w-1/4" key={sura.id}>
                    <div class="flex bg-gray-100 px-5 py-3 sm:flex-row flex-col">
                        <div class="w-7 h-6 sm:mr-5 inline-flex items-center justify-center text-gray-500 text-xl">{sura.nr}</div>
                        <div class="flex-grow text-gray-900 text-lg title-font font-medium">{sura.sura}</div>
                        <div class="flex items-center">
                            <input type="radio" name="skill" id="radio1" class="h-4 w-4" />
                            <label class="pl-1 pr-3 text-base font-medium">0</label>
                        </div>
                        <div class="flex items-center">
                            <input type="radio" name="skill" id="radio2" class="h-4 w-4" />
                            <label for="radio2" class="pl-1 pr-3 text-base font-medium">1</label>
                        </div>
                        <div class="flex items-center">
                            <input type="radio" name="skill" id="radio3" class="h-4 w-4" />
                            <label for="radio3" class="pl-1 text-base font-medium">2</label>
                        </div>
                    </div>
                </div>
            ))}
            </div>
        </div>
    );
}

export default SkillsContainer;