var config = {
    "defaultUnits":"pt",
    "baseLeading":13.25,
    "preferredPlaceColumn":0,
    "baseAlignmentItterationLimit":3,
    "floatLandscape":false,
    "pageCountDetails":"Rounded",
    "floatOnFirstPageForDefaultLayout":true,
    "landscapeFloatOnFirstPage":false,
    "articleTypeNotFloatsOnFirstPage":["undefined","DEFAULT"
    ],
    "floatTypeOnFirstPage":"KEY",
    "minStackSpace":18,
    "placeStyle":"Sandwich",
    "figCaptionMinLines": 0,
    "minNoLinesOnPag":3,
    "applyTableLeftRightBorder":false,
    "applyTableBorderWidth":0.15,
    "applyTableBorderColor":'WHITE',
    "pageSize":{
        "width":504,
        "height":720
    },
    "exportPDFpreset":{
        "print":{
            "crop_marks":true, 
            "bleed_marks":true, 
            "registration_marks":false, 
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
      "top":18,
      "bottom":18,
      "left":18,
      "right":18,
      "gutter":18
    },
    "geoBoundsVerso":[71.6,63,638.7,423
    ],
    "geoBoundsRecto":[71.6,585,638.7,945
    ],
    "articleTypeDetails":{
    "undefined":"LAYOUT1",
    "DEFAULT":"LAYOUT1"
    },
    "pageColumnDetails":{
        "LAYOUT1":{        
            "openerPageColumnDetails":[
                  {"width":360, "height":555.786,"floatsCited":false,"gutter":0}
                ],
            "columnDetails":[
                  {"width":360, "height":567.1,"floatsCited":false,"gutter":0}
                ],
            "openerPageMargin":{
                "top":82.714,
                "bottom":81.5,
                "inside":81,
                "outside":63
                },
            "otherPageMargin":{
                "top":71.6,
                "bottom":81.5,
                "inside":81,
                "outside":63
                }
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
      "singleColumnStyle":false,//if this is true then the landscape float could be placed in landscape single column
      "twoThirdColumnStyle":false,//if this is true then the landscape float could be placed in landscape two third column
      "twoThirdWidth":340.85, 
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
            "continuedText": "(<i>(Continued)</i>)",
            "continuedTextStyle": "TBL_Cont",
            "tableBottomDefaultGap": 6
          },
          "header": {
            "continuedText":"Table [ID]. [CAPTION][ensp](<i>(Continued)</i>)",
    //        "continuedText":"Table [ID].[emsp](<i>Continued</i>)",
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
            "before":"jrnlHead1,jrnlHead1_First,jrnlHead2,jrnlHead3,jrnlRefHead,BL-T,NL-T,BL-O,NL-O,QUOTE-T",
            "after":"BL-B,NL-B,BL-O,NL-O,QUOTE-O,QUOTE-B"
         },
        "decrease":{
            "before":"jrnlHead1,jrnlHead1_First,jrnlHead2,jrnlHead3,jrnlRefHead,BL-T,NL-T,BL-O,NL-O,QUOTE-T",
            "after":"BL-B,NL-B,BL-O,NL-O,QUOTE-O,QUOTE-B"
         },
        "limitationPercentage":{
            "minimum":[40,45,50],
            "maximum":[60,70,80]
            }
    },
    "detailsForVJ":{
        "VJallowed":true,
        "stylesExcludedForVJ":"jrnlAuthors,jrnlArtTitle,jrnlAbsHead,jrnlHead1,jrnlHead1_First,jrnlHead2,jrnlHead3",
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
         {"xpath" : "//div[@class='jrnlStubBlock']", "frame-name":"STUB_COLUMN", "action":"move", "styleOverride":null},
         {"xpath" : "//p[@pstyle='jrnlCVTL']", "frame-name":"CVTL", "action":"move", "styleOverride":null},
         {"xpath" : "//p[@pstyle='jrnlCRTR']", "frame-name":"CRTR", "action":"move", "styleOverride":null},
         {"xpath" : "//div[@class='jrnlCRBR']", "frame-name":"CRBR", "action":"move", "styleOverride":null},
         {"xpath" : "//div[@class='jrnlCVBL']", "frame-name":"CVBL", "action":"move", "styleOverride":null},
         {"xpath" : "//p[@pstyle='jrnlSTRH']", "frame-name":"RRH", "action":"move", "styleOverride":null},
         {"xpath" : "//p[@pstyle='jrnlARH']", "frame-name":"LRH", "action":"move", "styleOverride":null},
         {"xpath" : "//div[@class='jrnlRelatedInfo']", "frame-name":"RELATED_ARTICLE_INFO", "action":"move", "styleOverride":null},
         {"xpath" : "//div[@class='jrnlMetaInfo']", "frame-name":"METAINFO", "action":"move", "styleOverride":null},
         {"xpath" : "//div[@class='jrnlRelatedInfo']", "frame-name":"RELATED_ARTICLE_INFO", "action":"move", "styleOverride":null}
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
                    "colourValue":"0,0,0,0"
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
                    "colourValue":"0,0,0,0"
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
            "table" : {
                "css" : {
                    "font-size" : "9pt",
                    "font-family" : "'New Century Schoolbook', New Century Schoolbook"
                },
                "fontPath"  : "NewCenturySchoolbook/new-century-schoolbook-roman.ttf"
            },
            "thead": {
                "css" : {
                    "font-family" : "'New-Century-Schoolbook-Bold', New-Century-Schoolbook-Bold",
                    "font-size" : "9pt",
                    "line-height" : "13pt",
                    "padding" : "0.5px 0px 0.5px 0px",
                },
                "align" : "left",
                "valign": "bottom"
            },
            "tbody":{
                "css" : {
                    "font-family" : "'New-Century-Schoolbook-Roman', New-Century-Schoolbook-Roman",
                    "font-size" : "9pt",
                    "line-height" : "13.25pt",
                    "padding" : "0px 0px 0.5px 0px",
                },
                "align" : "left",
                "valign": "bottom"
            }
        },
        "equation" : {
          "default" : {
              "page":{
                  "size" : "504pt"
              },
              "font" : {
                  "size"    : "9.25pt",
                  "ledding" : "13.25pt",
                  "path"    : "/var/www/html/_default/_exeter/fonts/new-century-schoolbook-roman/",
                  "ext"     : "ttf",
                  "bold"    : "New-Century-Schoolbook-Bold",
                  "italic"  : "New-Century-Schoolbook-Italic",
                  "bold_italic":"New-Century-Schoolbook-Bold",
                  "main"    : "New-Century-Schoolbook-Roman"
              }
           },
           "jrnlTblBlock" : {
              "page":{
                  "size" : "504pt"
              },
              "font" : {
                "size"    : "9pt",
                "ledding" : "13pt",
                "path"    : "/var/www/html/_default/_exeter/fonts/new-century-schoolbook-roman/",
                "ext"     : "ttf",
                  "bold"    : "New-Century-Schoolbook-Bold",
                  "italic"  : "New-Century-Schoolbook-Italic",
                  "bold_italic":"New-Century-Schoolbook-Bold",
                  "main"    : "New-Century-Schoolbook-Roman"
              }
           }
        },
 
 "runOnSectionsOrArticles":[
        {"xpath":"//div[@class='jrnlAppGroup']",
            "continueType":"freshPage",
            "spaceAbove":30,
            "firstbaselineOffset":1296135023,
            "columnDetails":{        
                "openerPageColumnDetails":[
                  {"width":360, "height":555.786,"floatsCited":false,"gutter":0}
                    ],
                    "columnDetails":[
                      {"width":360, "height":567.1,"floatsCited":false,"gutter":0}
                      ],
                "openerPageMargin":{
                "top":82.714,
                "bottom":81.5,
                "inside":81,
                "outside":63
                },
            "otherPageMargin":{
                              "top":71.6,
                "bottom":81.5,
                "inside":81,
                "outside":63

                }
            }
        }
    ]
}    
    
