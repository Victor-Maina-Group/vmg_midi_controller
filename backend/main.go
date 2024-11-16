package main

import (
	"embed"
	_ "embed"
	"fmt"
	"log"
	"net"
	"net/http"
	"vmg_midi/api"
	"vmg_midi/env"
)

//go:embed static
var static embed.FS

//go:embed static/index.html
var indexHTML embed.FS

func main() {
	port := env.GetPort()
	log.Println(port)

	server, router := api.APIServer()
	listener, err := net.Listen("tcp", port)
	if err != nil {
		panic(err)
	}

	router.HandleFunc("/ws", api.WsEnpointHandler)

	router.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		// Try to serve the static file
		staticFS := http.FS(static)
		fileServer := http.FileServer(staticFS)

		// Create a sub-request for static files
		r.URL.Path = "/static/" + r.URL.Path
		fileServer.ServeHTTP(w, r)

		if r.Header.Get("Content-Type") == "" {
			// Send HTML content
			parsed, err := static.ReadFile("static/index.html")
			if err != nil {
				fmt.Println(err)
			}
			w.Header().Add("Content-Type", "text/html")
			w.Write(parsed)
		}
	})

	log.Printf("Server listening on http://localhost:%v", listener.Addr().(*net.TCPAddr).Port)

	server.Serve(listener)
}
