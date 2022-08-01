using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using TMPro;
using UnityEngine;

public class RoomInfoText : MonoBehaviour
{
    private TextMeshProUGUI _textMeshProGUI;

    private void Awake()
    {
        _textMeshProGUI = gameObject.GetComponent<TextMeshProUGUI>();
    }

    public void UpdateRoomText(string roomCode, string hostId, Dictionary<string, string> clients)
    {
        if (!_textMeshProGUI) return;
        
        var staticText = $"<b>Room Code:</b> {roomCode}\n<b>Host ID:</b> {hostId}\n\n<b>Clients:</b>\n";
        var clientsText = string.Join('\n', clients.Select(x => ($"<b>{x.Value}:</b> {x.Key}")));

        _textMeshProGUI.text = staticText + "\n" + clientsText;
    }
}
