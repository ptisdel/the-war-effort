using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using TMPro;

public class FrameCount : MonoBehaviour
{

    public TextMeshProUGUI TextComponent;
    int count;

    // Start is called before the first frame update
    void Start()
    {
        count = 0;   
    }

    // Update is called once per frame
    void Update()
    {
        count++;
        TextComponent.text = count.ToString();
    }
}
