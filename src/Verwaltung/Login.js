import { useAuthenticator, Authenticator } from '@aws-amplify/ui-react';
import "@aws-amplify/ui-react/styles.css";
import Admin from './Admin';
import Teacher from './Teacher';
import Member from './Member';

function Verwaltung() {
  const { signOut } = useAuthenticator((context) => [context.user]);
  const { user } = useAuthenticator((context) => [context.user]);
  const group = user.signInUserSession.accessToken.payload["cognito:groups"];

  return (
    <div className="Dashboard bg-gray-100 h-screen flex ">
      <aside class="flex">
          <div class="flex flex-col items-center w-16 h-screen py-8 space-y-8 bg-white">
            <a href="https://lerne-koran.de" class="flex items-center justify-center rounded-md bg-white px-4 text-blue-600">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-8 w-8 cursor-pointer">
                <path stroke-linecap="round" stroke-linejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
              </svg>
            </a>

              <button class="p-1.5 text-blue-500 transition-colors duration-200 bg-blue-100 rounded-lg">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                  </svg>
              </button>

              {group.includes('Admin') &&
                <button class="p-1.5 text-gray-500 focus:outline-nones transition-colors duration-200 rounded-lg hover:bg-gray-100">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
                    </svg>
                </button>
              }

              <button class="p-1.5 text-gray-500 focus:outline-nones transition-colors duration-200 rounded-lg hover:bg-gray-100">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-6 w-6">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5m.75-9l3-3 2.148 2.148A12.061 12.061 0 0116.5 7.605" />
                </svg>
              </button>

              <button onClick={signOut} class="p-1.5 text-gray-500 focus:outline-nones transition-colors duration-200 rounded-lg hover:bg-gray-100">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-6 w-6">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
                </svg>
              </button>
          </div>

          <div class="h-screen py-8 overflow-y-auto bg-white border-l border-r sm:w-64 w-60">
              <h2 class="px-5 text-lg font-medium text-gray-800">Lerne-Koran.de</h2>
              <div class="mt-8 px-5">
                  <div class="font-medium text-gray-700 capitalize">{user.attributes.name} {user.attributes.family_name}</div>
                  <p class="text-sm text-gray-500">
                    {group.includes('Admin') && "Administation"}
                    {group.includes('Teacher') && "Lehrkraft"}
                    {group.includes('Member') && "Teilnehmer/in"}
                  </p>
              </div>
              <div class="mt-5 px-5 text-sm text-gray-500">{user.attributes.email}</div>
              <div class="mt-5 px-5 text-sm text-gray-500">{user.attributes.birthdate}</div>
          </div>
          
          {group.includes('Admin') &&
          <div class="h-screen py-8 overflow-y-auto bg-white border-l border-r sm:w-64 w-60 hidden">
              <h2 class="px-5 text-lg font-medium text-gray-800">Teilnehmer</h2>
              <div class="mt-8">
                  <button class="flex items-center w-full px-5 py-2 transition-colors duration-200 gap-x-2 hover:bg-gray-100 focus:outline-none">
                      <div class="text-left rtl:text-right">
                          <h1 class="text-sm font-medium text-gray-700 capitalize">Mia John</h1>
          
                          <p class="text-xs text-gray-500">11.2 Followers</p>
                      </div>
                  </button>

                  <button class="flex items-center w-full px-5 py-2 transition-colors duration-200 gap-x-2 hover:bg-gray-100 focus:outline-none">
                      <div class="text-left rtl:text-right">
                          <h1 class="text-sm font-medium text-gray-700 capitalize">arthur melo</h1>
          
                          <p class="text-xs text-gray-500">1.2 Followers</p>
                      </div>
                  </button>

                  <button class="flex items-center w-full px-5 py-2 transition-colors duration-200 bg-gray-100 gap-x-2 focus:outline-none">
                      <div class="text-left rtl:text-right">
                          <h1 class="text-sm font-medium text-gray-700 capitalize">Jane Doe</h1>
                          <p class="text-xs text-gray-500">15.6 Followers</p>
                      </div>
                  </button>
              </div>
          </div>
          }
      </aside>
      <main class="main -ml-48 flex flex-grow flex-col p-8 transition-all duration-150 ease-in md:ml-0">
        <div class="flex h-full bg-white px-12 py-8 shadow-md">
          {group.includes('Admin') && <Admin/>}
          {group.includes('Teacher') && <Teacher/>}
          {group.includes('Member') && <Member/>}
        </div>
      </main>
    </div>
  );
}

function Login() {
  return (
      <Authenticator.Provider>
        <Authenticator>
          <Verwaltung />
        </Authenticator>
      </Authenticator.Provider>
  );
}

export default Login;