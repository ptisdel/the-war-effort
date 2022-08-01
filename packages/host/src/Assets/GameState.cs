using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class GameState : MonoBehaviour
{
    [SerializeField] private RoomInfoText roomInfoText;
    
    private string _roomCode;
    private string _hostId;
    private Dictionary<string, string> _clients;

    public void UpdateRoomInfo(string newRoomCode, string newHostId, Dictionary<string, string> newClients) {
        _roomCode = newRoomCode;
        _hostId = newHostId;
        _clients = newClients;
        
        roomInfoText.UpdateRoomText(_roomCode, _hostId, _clients);
    }
}
