package api

import (
	"log"
	"net"
	"net/http"
)

func APIServer() (*http.Server, *http.ServeMux) {
	router := &http.ServeMux{}
	server := &http.Server{
		Handler: router,
	}

	return server, router
}

func findLocalIp() string {
	// Get a list of all interfaces on the system
	interfaces, err := net.Interfaces()
	if err != nil {
		log.Fatal("Unable to get interfaces: ", err)
	}

	// Loop through all network interfaces
	for _, i := range interfaces {
		// Skip interfaces that are down
		if i.Flags&net.FlagUp == 0 {
			continue
		}

		// Get a list of addresses associated with the interface
		addrs, err := i.Addrs()
		if err != nil {
			log.Fatal("Unable to get addresses: ", err)
		}

		// Loop through all the addresses
		for _, addr := range addrs {
			// We're only interested in IPv4 addresses
			var ip net.IP
			switch v := addr.(type) {
			case *net.IPNet:
				ip = v.IP
			case *net.IPAddr:
				ip = v.IP
			}

			// Check if the IP is a loopback address (127.0.0.1), skip it if true
			if ip == nil || ip.IsLoopback() {
				continue
			}

			// Return the first non-loopback IP address found
			if ip.To4() != nil {
				return ip.String()
			}
		}
	}

	return ""
}

func GetIpAddress(w http.ResponseWriter, r *http.Request) {
	ip := findLocalIp()
	if ip == "" {
		w.WriteHeader(500)
		w.Write([]byte("Could not find server's IP"))
	}

	w.WriteHeader(200)
	w.Write([]byte(ip))
}
