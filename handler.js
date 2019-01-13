"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const aws_sdk_1 = require("aws-sdk");
function userCreation(event, context, callback) {
    const dynamodb = new aws_sdk_1.DynamoDB();
    const params = {
        Key: {
            email: {
                S: event.request.userAttributes.email,
            },
        },
        TableName: "Homeplanit-Users",
    };
    console.info("Checking if database user exists.");
    dynamodb.getItem(params, (getError, data) => {
        if (getError) {
            callback(getError);
        }
        console.info("getItem completed");
        if (!data.Item) {
            console.info("User does not exist.");
            const userCreationParams = {
                Item: {
                    email: {
                        S: event.request.userAttributes.email,
                    },
                },
                TableName: "Homeplanit-Users",
            };
            /* tslint:disable:align */
            dynamodb.putItem(userCreationParams, (putError) => {
                if (putError) {
                    callback(putError);
                }
                else {
                    console.info("User put completed.");
                }
                callback(null, event);
            });
        }
        else {
            console.warn("User already existed!");
            callback(null, event);
        }
    });
}
exports.userCreation = userCreation;
