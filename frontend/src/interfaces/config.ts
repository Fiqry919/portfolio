import { IconifyIcon } from "@iconify/react"
import { IntersectionView } from "./page"

export type Mode = 'manual' | 'github'

export interface App {
    title: string
    description: string
    intersection?: IntersectionView
    loadProfile?: 'manual' | 'github'
}

export interface Profile {
    avatar: string
    name: string
    bio?: string | string[]
    resume?: string
}

export interface Information {
    icon: string | IconifyIcon
    title: string
    value: string
    link?: string
}

export interface OtherInformation {
    from: string
    to?: string
    title: string
    value: string
    link?: string
}

export interface Github {
    username: string
    display: boolean
    sortBy: 'stars' | 'updated'
    limit: number
    fork: boolean // Forked projects will not be displayed if set to true
    exclude: string | string[] // example: ['username/my-project1', 'username/my-project2']
}

export interface ExternalProject {
    title: string,
    description?: string
    image?: string
    link?: string
}

export interface Config {
    app: App
    profile: Profile
    information?: Information[]
    experiences?: OtherInformation[]
    educations?: OtherInformation[]
    certifications?: OtherInformation[]
    skills?: string[]
    github: Github
    projects: ExternalProject[]
}