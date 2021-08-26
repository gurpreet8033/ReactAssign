package main

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"

	// "strconv"

	"github.com/aws/aws-sdk-go-v2/aws"
	"github.com/aws/aws-sdk-go/aws/session"
	"github.com/aws/aws-sdk-go/service/dynamodb"
	"github.com/aws/aws-sdk-go/service/dynamodb/dynamodbattribute"
)

type Data struct {
	Id     int    `json:"Id"`
	UserId int    `json:"UserId"`
	Title  string `json:"Title"`
	Body   string `json:"Body"`
}

//Global Variable
var tableName string = "SearchData"

// Get table items from JSON file
func getItems() []Data {
	raw, err := ioutil.ReadFile("sample.json")
	if err != nil {
		log.Fatalf("Got error reading file: %s", err)
	}

	var items []Data
	json.Unmarshal(raw, &items)
	return items
}

func upload() {

	sess := session.Must(session.NewSessionWithOptions(session.Options{
		SharedConfigState: session.SharedConfigEnable,
	}))

	// Create DynamoDB client
	svc := dynamodb.New(sess)

	// Get table items from .movie_data.json
	items := getItems()
	fmt.Print(items)

	for _, item := range items {
		av, err := dynamodbattribute.MarshalMap(item)
		if err != nil {
			log.Fatalf("Got error marshalling map: %s", err)
		}

		// Create item in table Movies
		input := &dynamodb.PutItemInput{
			Item:      av,
			TableName: aws.String(tableName), //replace the table name from your dynamo db
		}

		_, err = svc.PutItem(input)
		if err != nil {
			log.Fatalf("Got error calling PutItem: %s", err)
		}
	}
}

func main() {
	upload()

}
