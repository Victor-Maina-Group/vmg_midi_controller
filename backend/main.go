package main

import (
	"log"
	"net"
	"vmg_midi/api"
	"vmg_midi/env"
)

func main() {
	port := env.GetPort()
	log.Println(port)

	server, router := api.APIServer()
	listener, err := net.Listen("tcp", port)
	if err != nil {
		panic(err)
	}

	router.HandleFunc("/", api.HomeHandler)
	router.HandleFunc("/ws", api.WsEnpointHandler)

	log.Printf("Server listening on http://localhost:%v", listener.Addr().(*net.TCPAddr).Port)

	server.Serve(listener)
}
