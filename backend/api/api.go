package api

import (
	"net/http"
)

func APIServer() (*http.Server, *http.ServeMux) {
	router := &http.ServeMux{}
	server := &http.Server{
		Handler: router,
	}

	return server, router
}
