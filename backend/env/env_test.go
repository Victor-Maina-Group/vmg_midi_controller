package env

import (
	"os"
	"testing"
)

func TestEnvPrefix(t *testing.T) {
	got := envPrefix("TEST")
	expected := "VMG_MIDI_TEST"

	if got != expected {
		t.Errorf("Got %s, expected %s", got, expected)
	}
}

func TestGetPort(t *testing.T) {
	// Setup
	os.Setenv(envPrefix("PORT"), "3000")
	defer os.Unsetenv(envPrefix("PORT"))

	// Tests
	got, err := getPort()
	expected := 3000

	if err != nil {
		t.Error(err)
	}

	if got != expected {
		t.Errorf("Got %d, expected %d", got, expected)
	}
}

func TestGetSecret(t *testing.T) {
	// Setup
	expected := "This is a secret key."
	os.Setenv(envPrefix("SECRET"), "This is a secret key.")
	defer os.Unsetenv(envPrefix("SECRET"))

	// Tests
	got, err := getSecret()

	if err != nil {
		t.Error(err)
	}

	if got != expected {
		t.Errorf("Got %s, expected %s", got, expected)
	}
}

func TestGetEnv(t *testing.T) {
	// Setup
	os.Setenv(envPrefix("PORT"), "3000")
	os.Setenv(envPrefix("SECRET"), "This is a secret key.")
	defer os.Unsetenv(envPrefix("PORT"))
	defer os.Unsetenv(envPrefix("SECRET"))

	// Tests
	got, err := GetEnv()
	expected := Env{
		Port:   3000,
		Secret: "This is a secret key.",
	}

	if err != nil {
		t.Error(err)
	}

	if got != expected {
		t.Errorf("Got %v, expected %v", got, expected)
	}
}
