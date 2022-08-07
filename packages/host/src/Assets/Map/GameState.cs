using System.Collections.Generic;
using Map.Regions;
using Map.Scenarios;
using UnityEngine;

namespace Map
{
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

        private void InitializeRegions(List<Region> regionsList)
        {
            regionsList.ForEach(region => { regionsController.CreateRegion(region); });
        }

        void Awake()
        {
            InitializeRegions(SampleData.sampleScenario.regions);
        }


    }

}

