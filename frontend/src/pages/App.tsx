/* eslint-disable */
import React from 'react';
import { omit } from 'lodash';
import ErrorView from './Error';
import useHead from '../hooks/head';
import useTheme from '../hooks/theme';
import Request from '../utils/request';
import InfoCard from '../components/card/Info';
import SkillCard from '../components/card/Skill';
import GithubCard from '../components/card/Github';
import FloatAction from '../components/FloatAction';
import { HelmetProvider } from 'react-helmet-async';
import ProfileCard from '../components/card/Profile';
import OtherInfoCard from '../components/card/OtherInfo';
import ExternalProjectCard from '../components/card/External';
import { Config, Mode, OtherInformation, Profile } from '../interfaces/config';
import { ErrorPage, GithubProject, IntersectionView } from '../interfaces/page';
import Utils from '../utils';

export default function App() {
  useHead();

  const utils = new Utils();
  const [theme, setTheme] = useTheme();
  const exclude = ['information', 'skills', 'projects']

  const [mode, setMode] = React.useState<"manual" | "github" | null>(null);
  const [config, setConfig] = React.useState<Config | null>(null);
  const [intersection, _] = React.useState<IntersectionView>({ loop: true });

  const [loading, setLoading] = React.useState<boolean>(false);
  const [error, setError] = React.useState<ErrorPage | null>(null);
  const [project, setProject] = React.useState<GithubProject[]>([]);
  const [profile, setProfile] = React.useState<Profile | null>(null);

  function getMode() {
    Request({
      url: `${utils.env('url')}/mode`,
      success(res) {
        if (!res.meta.status) {
          throw new ResponseError(res.meta.message, res.meta.status)
        }
        setMode(res.data.mode)
      },
      error(e) {
        const error = ResponseError.parse(e);
        serializeError(error, error.code);
      },
      finally() {
        if (mode !== null) {
          getConfig(mode)
        }
      },
    });
  }

  function getConfig(mode: Mode) {
    setLoading(true);
    Request({
      url: `${utils.env('url')}/config`,
      method: "POST",
      body: { mode },
      success(res) {
        if (!res.meta.status) {
          throw new ResponseError(res.meta.message, res.meta.status)
        }
        getProfile(res.data);
      },
      error(e) {
        const error = ResponseError.parse(e);
        serializeError(error, error.code);
      }
    });
  }

  function getProfile(data: Config) {
    setConfig(data);
    switch (mode) {
      case "manual":
        const bio = (data.profile.bio as string).split(', ');
        setProfile({
          bio,
          avatar: `${utils.env("url")}/${data.profile.avatar}`,
          name: data.profile.name,
          resume: data.profile.resume
        });
        getGithubProject(data);
        break;
      case "github":
        if (!data.github.username) {
          throw new ResponseError({
            title: "Invalid Configuration",
            message: <p>
              Please provide correct config in <code>config.ts</code>.
            </p>
          }, 500);
        }
        Request({
          url: `https://api.github.com/users/${data.github.username}`,
          success(res, status) {
            if (status >= 400) {
              return serializeError(res, status);
            }
            setProfile({
              avatar: res.avatar_url,
              name: res.name || ' ',
              bio: res.bio || '',
            });
          },
          error(e) {
            serializeError(ResponseError.parse(e), 500);
          },
          finally() {
            getGithubProject(data);
          },
        });
        break;
      default:
        serializeError({
          title: "Invalid Configuration",
          message: <p>
            Please provide correct config in <code>config.ts</code>.
          </p>
        }, 500);
        break;
    }
  }

  function getGithubProject(data: Config) {
    const exclude = data.github.exclude ? (data.github.exclude as string).split(', ').map((v) => `+-repo:${v}`).join('') : '';
    const query = `user:${data.github.username}+fork:${!data.github.fork}${exclude}`;

    if (!data.github.username) console.log("empty github username: ", data.github.username);

    Request({
      url: `https://api.github.com/search/repositories?q=${query}&sort=${data.github.sortBy}&per_page=${data.github.limit}&type=Repositories`,
      success(res, status) {
        if (status >= 400) {
          return serializeError(res, status);
        }
        setProject(res.items);
      },
      error(e) {
        serializeError(ResponseError.parse(e), 500);
      },
      finally() {
        setLoading(false);
      },
    })
  }

  function serializeError(data: any, code: number) {
    switch (code) {
      case 403:
        setError({
          code: 429,
          title: 'Too Many Request',
          message: <p>Oh no, you hit the <a href="https://developer.github.com/v3/rate_limit/" target="_blank" rel="noopener noreferrer" className="underline">rate limit</a>! Try again later in less than a minute.</p>
        });
        break;
      case 404:
        setError({
          code: code,
          title: 'Invalid GitHub Username',
          message: <p>
            Please provide correct github username in{' '}
            <code>config.ts</code>.
          </p>
        });
        break;
      default:
        setError({
          code: code,
          title: data.title || 'Ops Something Wrong!',
          message: data.message || data
        });
        break;
    }
  }

  function SerializeOtherInfo(key: number, title: string, data: OtherInformation[]) {
    return data.length > 0 && (
      <OtherInfoCard
        key={key}
        data={data}
        loading={loading}
        title={title.slice(0, -1)}
        intersection={intersection}
      />
    )
  }

  React.useEffect(() => {
    getMode();
  }, [mode]);


  return (
    <HelmetProvider>
      <div className="fade-in h-screen">
        {
          error ? (
            <ErrorView title={error.title} code={error.code} message={error.message} />
          ) : (
            <div className='min-h-full p-4 lg:p-10 dark:bg-gray-900'>
              <div className="container mx-auto">
                <div className='flex flex-col gap-6'>
                  {/* profile */}
                  {
                    profile && (
                      <ProfileCard loading={loading} intersection={intersection} profile={profile} />
                    )
                  }
                  {/* information */}
                  <div className='grid grid-cols-1 lg:grid-cols-3 gap-6 rounded-box'>
                    {/* left */}
                    <div className='col-span-1'>
                      <div className='grid grid-cols-1 gap-6'>
                        {
                          config && config.information && (
                            <InfoCard loading={loading} intersection={intersection} info={config.information} />
                          )
                        }
                        {
                          config && config.skills && (
                            <SkillCard loading={loading} intersection={intersection} skills={config.skills} />
                          )
                        }
                        {
                          config && Object.keys(omit(config, exclude)).map((value, key) => (
                            Array.isArray((config as any)[value]) && SerializeOtherInfo(key, value, (config as any)[value])
                          ))
                        }
                      </div>
                    </div>
                    {/* right */}
                    <div className='col-span-1 lg:col-span-2'>
                      <div className="grid grid-cols-1 gap-6">
                        {
                          config && project.length > 0 && (
                            <GithubCard
                              title='Github Project'
                              loading={loading}
                              projects={project}
                              username={config.github.username}
                              intersection={intersection}
                            />
                          )
                        }
                        {
                          config && config.projects && config.projects.length > 0 && (
                            <ExternalProjectCard
                              title={"My Projects"}
                              loading={loading}
                              intersection={intersection}
                              projects={config.projects}
                            />
                          )
                        }
                      </div>
                    </div>
                    {/*  */}
                    <FloatAction props={{ theme, setTheme }} />
                  </div>
                </div>
              </div>
            </div>
          )
        }
      </div>
    </HelmetProvider>
  );
}
