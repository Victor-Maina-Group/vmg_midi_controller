package env

import (
	"fmt"
	"os"

	_ "github.com/joho/godotenv/autoload"
)

type Env struct {
	Port   string
	Secret string
}

func envPrefix(env string) string {
	return "VMG_MIDI_" + env
}

func GetPort() string {
	port := os.Getenv(envPrefix("PORT"))

	if port == "" {
		return ":0"
	}

	return fmt.Sprintf(":%v", port)
}

func GetSecret() (string, error) {
	secret := os.Getenv(envPrefix("SECRET"))

	if secret == "" {
		return "", fmt.Errorf("%s is not set.", envPrefix("SECRET"))
	}

	return secret, nil
}

func GetEnv() (Env, error) {
	// e.Load("../.env")
	port := GetPort()

	secret, secret_err := GetSecret()
	if secret_err != nil {
		return Env{}, secret_err
	}

	return Env{port, secret}, nil
}
