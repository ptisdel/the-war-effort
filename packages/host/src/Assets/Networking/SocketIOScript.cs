using Firesplash.UnityAssets.SocketIO;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using TMPro;
using UnityEngine;
using UnityEngine.UI;

public class SocketIOScript : MonoBehaviour
{
    public SocketIOCommunicator sioCom;
    public TextMeshProUGUI statusText;

    struct RoomData {
        public string code;
        public string hostId;
        public Dictionary<string, string> clients;
    }

    void Start()
    {
        statusText.text = "Connecting...";

        sioCom.Instance.On("connect", (string data) => {
            statusText.text = "Connected!";
        });

        sioCom.Instance.On("room-updated", (string payload) => {
            var room = JsonConvert.DeserializeObject<RoomData>(payload);
            Debug.Log("ROOM INFO");        
            Debug.Log("- Code: " + room.code);        
            foreach (KeyValuePair<string, string> client in room.clients) {
                Debug.Log("- Client: " + client.Key + ", " + client.Value);
            }
        });

        sioCom.Instance.On("disconnect", (string payload) => {
            statusText.text = "Disconnected.";
        });
        
        sioCom.Instance.Connect();
    }
}
