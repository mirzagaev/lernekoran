import React, { useEffect } from "react";
import { Quran } from '../../models';
// import { Skills } from './models';
import { Amplify, DataStore } from 'aws-amplify';
import config from '../../aws-exports';
Amplify.configure(config);

async function onQuery() {
    const suran = await DataStore.query(Quran);
    console.log(suran);
}

function SkillsContainer({username}) {
    useEffect(() => {
        const subscription = DataStore.observe(Quran).subscribe((msg) => {
          console.log(msg.model, msg.opType, msg.element);
        });
    
        return () => subscription.unsubscribe();
    }, []);

    return (
        <div className="Skills">
            <h1>{username} hat 49 Themen gelernt</h1>

            <div>
                <input type="button" value="NEW" className="p-4 mr-2 text-white bg-blue-500" onClick={onCreate} />
                {/* <input type="button" value="DELETE ALL" onClick={onDeleteAll} /> */}
                <input type="button" value="QUERY rating > 4" className="p-4 mr-2 text-white bg-green-500" onClick={onQuery} />
            </div>

            <div class="flex flex-wrap -m-4">
                <div class="p-4 md:w-1/3">
                    <div class="flex bg-gray-50 px-5 py-3 sm:flex-row flex-col">
                        <div class="w-10 h-10 sm:mr-5 inline-flex items-center justify-center text-gray-500 text-xl">1</div>
                        <div class="flex-grow">
                            <h2 class="text-gray-900 text-lg title-font font-medium">Al Baqara</h2>
                            <p class="leading-relaxed text-sm font-light -mt-1">Die Eröffnende</p>
                        </div>
                        <div class="flex items-center">
                            <input type="radio" name="skill" id="radio1" class="h-5 w-5" />
                            <label for="radio1" class="pl-2 pr-5 text-base font-medium">0</label>
                        </div>
                        <div class="flex items-center">
                            <input type="radio" name="skill" id="radio2" class="h-5 w-5" />
                            <label for="radio2" class="pl-2 pr-5 text-base font-medium">1</label>
                        </div>
                        <div class="flex items-center">
                            <input type="radio" name="skill" id="radio3" class="h-5 w-5" />
                            <label for="radio3" class="pl-2 text-base font-medium">2</label>
                        </div>
                    </div>
                </div>
                <div class="p-4 md:w-1/3">
                    <div class="flex bg-lime-100 px-5 py-3 sm:flex-row flex-col">
                        <div class="w-10 h-10 sm:mr-5 inline-flex items-center justify-center text-gray-500 text-xl">1</div>
                        <div class="flex-grow">
                            <h2 class="text-gray-900 text-lg title-font font-medium">Al Baqara</h2>
                            <p class="leading-relaxed text-sm font-light -mt-1">Die Eröffnende</p>
                        </div>
                        <div class="flex items-center">
                            <input type="radio" name="skill" id="radio1" class="h-5 w-5" />
                            <label for="radio1" class="pl-2 pr-5 text-base font-medium">0</label>
                        </div>
                        <div class="flex items-center">
                            <input type="radio" name="skill" id="radio2" class="h-5 w-5" />
                            <label for="radio2" class="pl-2 pr-5 text-base font-medium">1</label>
                        </div>
                        <div class="flex items-center">
                            <input type="radio" name="skill" id="radio3" class="h-5 w-5" />
                            <label for="radio3" class="pl-2 text-base font-medium">2</label>
                        </div>
                    </div>
                </div>
                <div class="p-4 md:w-1/3">
                    <div class="flex bg-amber-100 px-5 py-3 sm:flex-row flex-col">
                        <div class="w-10 h-10 sm:mr-5 inline-flex items-center justify-center text-gray-500 text-xl">1</div>
                        <div class="flex-grow">
                            <h2 class="text-gray-900 text-lg title-font font-medium">Al Baqara</h2>
                            <p class="leading-relaxed text-sm font-light -mt-1">Die Eröffnende</p>
                        </div>
                        <div class="flex items-center">
                            <input type="radio" name="skill" id="radio1" class="h-5 w-5" />
                            <label for="radio1" class="pl-2 pr-5 text-base font-medium">0</label>
                        </div>
                        <div class="flex items-center">
                            <input type="radio" name="skill" id="radio2" class="h-5 w-5" />
                            <label for="radio2" class="pl-2 pr-5 text-base font-medium">1</label>
                        </div>
                        <div class="flex items-center">
                            <input type="radio" name="skill" id="radio3" class="h-5 w-5" />
                            <label for="radio3" class="pl-2 text-base font-medium">2</label>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SkillsContainer;