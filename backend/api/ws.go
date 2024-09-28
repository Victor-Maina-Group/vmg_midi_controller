package api

import (
	"encoding/json"
	"log"
	"net/http"
	"time"

	"github.com/gorilla/websocket"
	"gitlab.com/gomidi/midi/v2"
	"gitlab.com/gomidi/midi/v2/drivers"
)

var upgrader = websocket.Upgrader{
	ReadBufferSize:   3,
	WriteBufferSize:  3,
	HandshakeTimeout: 10 * time.Second,
}

func WsEnpointHandler(w http.ResponseWriter, r *http.Request) {
	ws, err := upgrader.Upgrade(w, r, nil)
	if err != nil {
		log.Println(err)
		return
	}
	log.Print("Websocket connected successfull")
	defer ws.Close()

	// Get portName from request body
	portName := r.URL.Query().Get("portName")
	if portName == "" {
		msg := "Please provide value for portName."
		log.Println(msg)
		w.WriteHeader(403)
		w.Write([]byte(msg))
	}

	// Open MIDI Out port with portName
	log.Printf("Looking for port named '%v'", portName)
	outPort, err := GetMIDIPortOut(portName)
	if err != nil {
		log.Println(err)
		return
	}
	if err := outPort.Open(); err != nil {
		log.Println(err)
		return
	}
	reader(outPort, ws)
	defer outPort.Close()
}

func reader(midiPort drivers.Out, ws *websocket.Conn) {
	for {
		_, p, err := ws.ReadMessage()
		if err != nil {
			log.Println(err)
			return
		}

		var message midi.Message
		if err := json.Unmarshal(p, &message); err != nil {
			log.Println(err)
			return
		}

		log.Printf("Client message: %v\n", message)
		if err := midiPort.Send(message); err != nil {
			log.Println(err)
			return
		}
	}
}
