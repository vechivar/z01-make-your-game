package main

import (
	"fmt"
	"net/http"
)

func main() {
	css := http.FileServer(http.Dir("./css"))
	http.Handle("/css/", http.StripPrefix("/css", css))

	js := http.FileServer(http.Dir("./js"))
	http.Handle("/js/", http.StripPrefix("/js", js))

	img := http.FileServer(http.Dir("./img"))
	http.Handle("/img/", http.StripPrefix("/img", img))

	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		http.ServeFile(w, r, "index.html")
	})

	fmt.Println("Game ready at http://localhost:8001/")

	http.ListenAndServe(":8001", nil)
}
