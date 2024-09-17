package env

import (
	"fmt"
	"os"
	"strconv"
)

type Env struct {
	port   int
	secret string
}

func envPrefix(env string) string {
	return "VMG_MIDI_" + env
}

func getPort() (int, error) {
	from_env := os.Getenv(envPrefix("PORT"))

	if from_env == "" {
		return 0, fmt.Errorf("%s is not set.", envPrefix("PORT"))
	}

	port, err := strconv.Atoi(from_env)
	if err != nil {
		return 0, err
	}

	return port, nil
}

func getSecret() (string, error) {
	secret := os.Getenv(envPrefix("SECRET"))

	if secret == "" {
		return "", fmt.Errorf("%s is not set.", envPrefix("SECRET"))
	}

	return secret, nil
}

func GetEnv() (Env, error) {
	port, port_err := getPort()
	if port_err != nil {
		return Env{}, port_err
	}

	secret, secret_err := getSecret()
	if secret_err != nil {
		return Env{}, secret_err
	}

	return Env{port, secret}, nil
}
