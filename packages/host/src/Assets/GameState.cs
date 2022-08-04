using System.Collections;
using System.Collections.Generic;
using System.Linq;
using TMPro;
using UnityEngine;

public class GameState : MonoBehaviour
{
    [SerializeField] private RoomInfoText roomInfoText;
    [SerializeField] private RegionsController regionsController;

    private string _roomCode;
    private string _hostId;
    private Dictionary<string, string> _clients;

    public void UpdateRoomInfo(string newRoomCode, string newHostId, Dictionary<string, string> newClients)
    {
        _roomCode = newRoomCode;
        _hostId = newHostId;
        _clients = newClients;

        roomInfoText.UpdateRoomText(_roomCode, _hostId, _clients);
    }

    private List<Region> _defaultRegions = new List<Region>() {
        new Region("0", "A", new Point(-1, 2), new List<string>() { "1", "2" }),
        new Region("1", "B", new Point(1, 4), new List<string>() { "0" }),
        new Region("2", "C", new Point(-5, 1), new List<string>() { "0", "3" }),
        new Region("3", "D", new Point(0, 0), new List<string>() { "1", "2" }),
    };

    private void InitializeRegions(List<Region> regionsList)
    {
        regionsList.ForEach(region => { regionsController.CreateRegion(region); });
    }

    void Awake()
    {
        InitializeRegions(_defaultRegions);
    }


}
