export interface ErrorPage {
    title: string
    code: number
    message: string | React.ReactElement
    previous?: boolean | number
}

export interface IntersectionView extends IntersectionObserverInit {
    loop?: boolean
}

export type SetTheme = (state: string) => void

export interface GithubProject {
    name: string;
    html_url: string;
    description: string;
    stargazers_count: string;
    forks_count: string;
    language: string;
}
