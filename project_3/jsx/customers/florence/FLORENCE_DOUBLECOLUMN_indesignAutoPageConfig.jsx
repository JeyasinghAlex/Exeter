var config = {
    "defaultUnits":"pt",
    "baseLeading":12,
    "preferredPlaceColumn":0,
    "baseAlignmentItterationLimit":3,
    "floatLandscape":false,
    "floatOnFirstPageForDefaultLayout":true,
    "landscapeFloatOnFirstPage":false,
    "articleTypeNotFloatsOnFirstPage":["undefined","DEFAULT"
    ],
    "floatTypeOnFirstPage":"KEY",
    "minStackSpace":18,
    "placeStyle":"Sandwich",
    "figCaptionMinLines": 0,
    "minNoLinesOnPag":3,
    "applyTableLeftRightBorder":true,
    "applyTableBorderWidth":0.75,
    "applyTableBorderColor":'RULE',
    "pageSize":{
        "width":542.175,
        "height":671.529
    },
    "exportPDFpreset":{
        "print":{
            "crop_marks":true, 
            "bleed_marks":false, 
            "registration_marks":true, 
            "colour_bars":false, 
            "page_information":false,
            "offset":8.504
            },
        "online":{
            "crop_marks":false, 
            "bleed_marks":false, 
            "registration_marks":false, 
            "colour_bars":false, 
            "page_information":false,
            "offset":0
            }
        },
    "wrapAroundFloat":{
      "top":12,
      "bottom":12,
      "left":12,
      "right":12,
      "gutter":12
    },
    "geoBoundsVerso":[83.9999999999998,132.471,618.528562992126,482.175
    ],
    "geoBoundsRecto":[83.9999999999998,674.646,618.528562992126,1024.35
    ],
    "articleTypeDetails":{
    "undefined":"LAYOUT1",
    "DEFAULT":"LAYOUT1"
    },
    "pageColumnDetails":{
        "LAYOUT1":{        
            "openerPageColumnDetails":[
                  {"width":168.852, "height":534.546,"floatsCited":false,"gutter":0},
                  {"width":168.852, "height":534.546,"floatsCited":false,"gutter":12}
                ],
                "columnDetails":[
                  {"width":168.852, "height":534.546,"floatsCited":false,"gutter":0},
                  {"width":168.852, "height":534.546,"floatsCited":false,"gutter":12},
                  {"width":72.475, "height":534.546,"floatsCited":false,"gutter":0, "imaginary":true}
                ],
                "openerPageMargin":{
                 "top":84,
                "bottom":53,
                "inside":132.471,
                "outside":60
                },
            "otherPageMargin":{
                 "top":84,
                "bottom":53,
                "inside":60,
                "outside":60
                },
            "miscColumnDetails":[
                  {"width":60.475, "height":534.546,"floatsCited":false,"gutter":12}
                ],
             "miscColumnOn":"outside"//the other possibilities would be 'inside' or 'leftside' or 'rightside' 
            }
        },
    "jrnlBoxBlock":{//these objects are for overriding actual floats placement 
        "KEY":{
            "calcCitationHeight":false,
            "preferredOnCurrentPage":true,
            "preferredOnColumn":1,
            "preferredPlacement":'top'
        },
        "KEY_BACK":{
            "calcCitationHeight":false,
            "preferredOnCurrentPage":true,
            "preferredOnColumn":0,
            "preferredPlacement":null
        }
    },
    "landscape":{
      "singleColumnStyle":true,//if this is true then the landscape float could be placed in landscape single column
      "twoThirdColumnStyle":false,//if this is true then the landscape float could be placed in landscape two third column
      "twoThirdWidth":233.123,
      "horizontalCenter":true//if this is true float could be center horizontally after rotated
    },
    "resizeImage":{
      "allow":false,
      "modifyLimit":0
    },
    "figCaption":{
      "position":"bottom",
      "sideCaption":{
        "figMinWidth":0,
        "figMaxWidth":0,
        "preferredPlace":"top"
      },
      "bottomCaption":{
        "figCapFrameWidth":60.475,
        "doubleColumn":true,
        "preferredPlace":"top"
      }
    },
    "tblCaption":{
      "position":"bottom",
      "sideCaption":{
        "figMinWidth":0,
        "figMaxWidth":0,
        "preferredPlace":"top"
      }
    },
"continuedStyle":{
    "table":{
      "footer": {
        "continuedText": "(<i>Continued</i>)",
        "continuedTextStyle": "TBL_Cont",
        "tableBottomDefaultGap": 6
      },
      "header": {
//~         "continuedText":"Table [ID]. [CAPTION][ensp](<i>Continued</i>)",
        "continuedText":"Table [ID].[emsp](<i>Continued</i>)",
        "space-below": 0,
        "repeat-header": true,
        "repeat-sub-header": false,
        "tableLastRowStyle": "TBLR",
        "tableHeadRowStyle": "TCH",
        "tableContinuedStyle": "TBL_ContHead",
        "tableLabelStyle": "tblLabel"
        }
    }
  },
    "adjustParagraphSpaceStyleList":{
        "increase":{
            "before":"jrnlHead1,jrnlHead1_First,jrnlHead2,jrnlHead3,jrnlRefHead,BL-T,NL-T,BL-O,NL-O,QUOTE-T,EQN-O,EQN-T",
            "after":"BL-B,NL-B,BL-O,NL-O,QUOTE-O,QUOTE-B,EQN-O,EQN-T,EQN-B"
         },
        "decrease":{
            "before":"jrnlHead1,jrnlHead1_First,jrnlHead2,jrnlHead3,jrnlRefHead,BL-T,NL-T,BL-O,NL-O,QUOTE-T,EQN-O,EQN-T",
            "after":"BL-B,NL-B,BL-O,NL-O,QUOTE-O,QUOTE-B,EQN-O,EQN-T,EQN-B"
         },
        "limitationPercentage":{
            "minimum":[40,45,50],
            "maximum":[60,70,80]
            }
    },
    "detailsForVJ":{
        "VJallowed":true,
        "stylesExcludedForVJ":"jrnlAuthors,jrnlArtTitle,jrnlAbsHead,jrnlHead1,jrnlHead2,jrnlHead3,jrnlChapTitle,jrnlArtSubTitle",
        "limitationPercentage":[6,9,12]
        },
    "adjustFloatsSpace":{
        "limitationPercentage":{
            "minimum":[30,35,40],
            "maximum":[60,70,80]
            }        
    },
    "trackingLimit":{
        "minimum":15,
        "maximum":15
    },
    "nonDefaultLayers":["PRIM_SUR"],
    
    "assignUsingXpath": {
       "toFrames":[
         {"xpath" : "//p[@pstyle='jrnlRRH']", "frame-name":"jrnlSTRH", "action":"move", "styleOverride":null},
         {"xpath" : "//p[@pstyle='jrnlLRH']", "frame-name":"jrnlSTLH", "action":"move", "styleOverride":null}
       ]       
     },
    "colorDetails":{
        "undefined":{
            "print":{
                "COLOR1":{
                    "colourType":"process",
                    "colourMode":"CMYK",
                    "colourValue":"0,0,0,100"
                    },
                "COLOR2":{
                    "colourType":"process",
                    "colourMode":"CMYK",
                    "colourValue":"0,0,0"
                    },
                "HYPERLINK":{
                    "colourType":"process",
                    "colourMode":"CMYK",
                    "colourValue":"0,0,0,100"
                    }
                },
            "online":{
                "COLOR1":{
                    "colourType":"process",
                    "colourMode":"RGB",
                    "colourValue":"0,0,0"
                    },
                "COLOR2":{
                    "colourType":"process",
                    "colourMode":"RGB",
                    "colourValue":"255,255,255"
                    },
                "HYPERLINK":{
                    "colourType":"process",
                    "colourMode":"RGB",
                    "colourValue":"0,0,0"
                    }
                }            
            },
            "DEFAULT":{
            "print":{
                "COLOR1":{
                    "colourType":"process",
                    "colourMode":"CMYK",
                    "colourValue":"0,0,0,100"
                    },
                "COLOR2":{
                    "colourType":"process",
                    "colourMode":"CMYK",
                    "colourValue":"0,0,0"
                    },
                "HYPERLINK":{
                    "colourType":"process",
                    "colourMode":"CMYK",
                    "colourValue":"0,0,0,100"
                    }
                },
            "online":{
                "COLOR1":{
                    "colourType":"process",
                    "colourMode":"RGB",
                    "colourValue":"0,0,0"
                    },
                "COLOR2":{
                    "colourType":"process",
                    "colourMode":"RGB",
                    "colourValue":"255,255,255"
                    },
                "HYPERLINK":{
                    "colourType":"process",
                    "colourMode":"RGB",
                    "colourValue":"0,0,0"
                    }
                }            
            }
        },
         "tableSetter" :{
            "thead": {
                "css" : {
                    "font-family" : "Times New Roman",
                    "font-size" : "9px",
                    "line-height" : "11px",
                    "padding" : "0px 6px 0px 6px",
                },
                 "fontPath"  : "TimesNewRoman/TimesNewRoman.ttf",
                "align" : "left",
                "valign": "bottom"
            },
            "tbody":{
                "css" : {
                    "font-family" : "Times New Roman",
                    "font-size" : "9px",
                    "line-height"  : "11px",
                    "padding" : "0px 6px 0px 6px",
                },
                 "fontPath"  : "TimesNewRoman/TimesNewRoman.ttf",
                "align" : "left",
                "valign": "bottom"
            }
        },
        "equation" : {
          "default" : {
              "page":{
                  "size" : "542.175pt"
              },
              "font" : {
                  "size"    : "10pt",
                  "ledding" : "12pt",
                  "path"    : "/TimesNewRoman/",
                  "ext"     : "ttf",
                  "bold"    : "TimesNewRoman-Bold",
                  "italic"  : "TimesNewRoman-Italic",
                  "bold_italic":"TimesNewRoman-BoldItalic",
                  "main"    : "TimesNewRoman"
              }
           }
    },
    "stubColObj":{
        "top": {
            "STUB_COLUMN": false,
            "STUB_STMT": false
        },
        "bottom": {
            "METAINFO": true,
            "CROSSMARK": false,
            "RELATED_ARTICLE_INFO": true
        }
    },
    "runOnSectionsOrArticles":[
        {"xpath":"//div[@class='jrnlAppGroup']",
            "continueType":"freshPage",
            "spaceAbove":30,
            "firstbaselineOffset":1296135023,
            "columnDetails":{
                "openerPageColumnDetails":[
                      {"width":168.852, "height":534.546,"floatsCited":false,"gutter":0},
                      {"width":168.852, "height":534.546,"floatsCited":false,"gutter":12}
                    ],
                "columnDetails":[
                      {"width":168.852, "height":534.546,"floatsCited":false,"gutter":0},
                      {"width":168.852, "height":534.546,"floatsCited":false,"gutter":12}
                    ],
                "openerPageMargin":{
                    "top":84,
                    "bottom":53,
                    "inside":132.471,
                    "outside":60
                    },
                "otherPageMargin":{
                    "top":84,
                    "bottom":53,
                    "inside":60,
                    "outside":60
                    }
                }
            }
        ]
    }