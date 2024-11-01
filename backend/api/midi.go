package api

import (
	"fmt"
	"log"

	"gitlab.com/gomidi/midi/v2"
	"gitlab.com/gomidi/midi/v2/drivers"
	_ "gitlab.com/gomidi/midi/v2/drivers/rtmididrv"
)

type (
	MIDIMessage struct{}
	PortType    int
)

const (
	In PortType = iota
	Out
)

func GetMIDIPort(name string, portType PortType) (drivers.Port, error) {
	switch portType {
	case In:
		in, err := midi.FindInPort(name)
		if err != nil {
			return nil, err
		}
		if in == nil {
			return nil, fmt.Errorf("Port not found with name %v\n", name)
		}
		log.Printf("In port found: %v\n", in.String())
		return in, nil
	case Out:
		out, err := midi.FindOutPort(name)
		if err != nil {
			return nil, err
		}
		if out == nil {
			return nil, fmt.Errorf("Port not found with name %v\n", name)
		}
		log.Printf("Out port found: %v\n", out.String())
		return out, nil
	default:
		return nil, fmt.Errorf("Invalid port type.")
	}
}

func GetMIDIPortIn(name string) (drivers.In, error) {
	port, err := GetMIDIPort(name, In)
	if err != nil {
		return nil, err
	}
	return midi.InPort(port.Number())
}

func GetMIDIPortOut(name string) (drivers.Out, error) {
	port, err := GetMIDIPort(name, Out)
	if err != nil {
		return nil, err
	}
	fmt.Println(port)
	return midi.OutPort(port.Number())
}

func SendMIDIMessage(port drivers.Out, msg midi.Message) error {
	return port.Send(msg)
}
