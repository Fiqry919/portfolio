
class Utils {
    public env(key: string) {
        return process.env[`REACT_APP_${key.toUpperCase()}`] as string
    }
}

export default Utils