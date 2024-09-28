package api

import (
	"log"
	"net/http"
)

func APIServer() (*http.Server, *http.ServeMux) {
	router := &http.ServeMux{}
	server := &http.Server{
		Handler: router,
	}

	return server, router
}

func HomeHandler(w http.ResponseWriter, r *http.Request) {
	log.Printf("Client connected to %v", r.URL)

	w.WriteHeader(200)
	w.Write([]byte("Server online!"))
}
