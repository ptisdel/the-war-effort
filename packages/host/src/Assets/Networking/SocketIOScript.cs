using Firesplash.UnityAssets.SocketIO;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using Map;
using TMPro;
using UnityEngine;
using UnityEngine.UI;

namespace Networking
{
    public class SocketIOScript : MonoBehaviour
    {
        public SocketIOCommunicator sioCom;
        public TextMeshProUGUI statusText;
        [SerializeField] GameState gameState;

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
                gameState.UpdateRoomInfo(room.code, room.hostId, room.clients);
            });

            sioCom.Instance.On("disconnect", (string payload) => {
                statusText.text = "Disconnected.";
            });
            
            sioCom.Instance.Connect();
        }
    }
    
}
