using System.Collections;
using System.Collections.Generic;
using TMPro;
using UnityEngine;

namespace Map.Regions
{
    public class RegionScript : MonoBehaviour
    {
        public List<string> neighbors = new List<string>();
        public string id;
        public Point point;

        private TextMeshPro _titleText;

        void Awake()
        {
            _titleText = gameObject.GetComponentInChildren<TextMeshPro>();
        }

        // Start is called before the first frame update
        void Start()
        {
            _titleText.text = gameObject.name;
        }
    }

    
}
