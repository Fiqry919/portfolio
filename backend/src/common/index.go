package common

import (
	"encoding/json"
	"fmt"
	"io"
	"io/fs"
	"log"
	"os"
	"os/exec"
	"runtime"
	"strings"
	"time"

	"github.com/joho/godotenv"
)

// remove specific index from array
func RemoveIndex(array []string, index int) []string {
	return append(array[:index], array[index+1:]...)
}

// clear console
func Clear() {
	switch runtime.GOOS {
	case "windows":
		cmd := exec.Command("cls")
		cmd.Stdout = os.Stdout
		cmd.Run()
	case "linux", "darwin":
		cmd := exec.Command("clear")
		cmd.Stdout = os.Stdout
		cmd.Run()
	default:
		fmt.Println("Unsupported operating system for terminal clear")
	}
}

// get current date with add date
func DateNow(format string, addDate int) string {
	if addDate != 0 {
		return time.Now().AddDate(0, 0, addDate).Format(format)
	}
	return time.Now().Format(format)
}

// read .env file
func Env(key string) string {
	err := godotenv.Load(".env")
	if err != nil {
		log.Fatal(".env file not found")
	}
	return os.Getenv(strings.ToUpper(key))
}

func Exctract_path(path string) string {
	split := strings.Split(path, "/")
	split = RemoveIndex(split, len(split)-1)
	return strings.Join(split, "/")
}

// make a directory with specific permission
func MakeDir(directory string, permission int) error {
	if _, err := os.Stat(directory); os.IsNotExist(err) {
		if err := os.MkdirAll(directory, fs.FileMode(permission)); err != nil {
			return err
		}
	} else if err != nil {
		return err
	}
	return nil
}

// read json file
func ReadJSON(file string, result interface{}) (interface{}, error) {
	read, err := os.Open(file)
	if err != nil {
		fmt.Println("Error opening file:", err)
		return nil, err
	}
	defer read.Close()

	data, err := io.ReadAll(read)
	if err != nil {
		fmt.Println("Error reading file:", err)
		return nil, err
	}

	err = json.Unmarshal(data, &result)
	if err != nil {
		fmt.Println("Error unmarshaling JSON:", err)
		return nil, err
	}
	return result, nil
}

// write a file
func WriteFile(path string, content string) error {
	MakeDir(Exctract_path(path), 0777)
	file, err := os.OpenFile(path, os.O_APPEND|os.O_CREATE|os.O_WRONLY, 0644)
	if err != nil {
		return err
	}
	defer file.Close()

	_, err = fmt.Fprintln(file, content)
	if err != nil {
		return err
	}
	return nil
}
