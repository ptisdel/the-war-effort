using System.Collections;
using System.Collections.Generic;
using TMPro;
using UnityEngine;

public class RegionScript : MonoBehaviour
{
    private TextMeshProUGUI _textMeshProGUI;
    public string regionName = ""; 

    private void Awake()
    {
        // _textMeshProGUI = gameObject.GetComponent<TextMeshProUGUI>();
    }

    // Start is called before the first frame update
    void Start()
    {
        // _textMeshProGUI.text = regionName;
    }
}
