using System.Collections;
using System.Collections.Generic;
using TMPro;
using UnityEngine;

public class FrameCount : MonoBehaviour
{

    private TextMeshProUGUI _textMeshProGUI;
    int count;

    private void Awake()
    {
        _textMeshProGUI = gameObject.GetComponent<TextMeshProUGUI>();
    }

    // Start is called before the first frame update
    void Start()
    {
        count = 0;   
    }

    // Update is called once per frame
    void Update()
    {
        count++;
        _textMeshProGUI.text = count.ToString();
    }
}
