var config = {
    "defaultUnits":"pt",
    "baseLeading":11,
    "preferredPlaceColumn":0,
    "baseAlignmentItterationLimit":3,
    "floatLandscape":false,
    "floatOnFirstPageForDefaultLayout":true,
    "articleTypeNotFloatsOnFirstPage":["undefined","DEFAULT"],
    "floatTypeOnFirstPage":"KEY",    
    "minStackSpace":18,
    "placeStyle":"Sandwich",
    "minNoLinesOnPag":3,
    "applyTableLeftRightBorder":false,   
     "pageSize":{
         "width":595.512,
        "height":842.256
    },
    "exportPDFpreset":{
        "print":{
            "crop_marks":true, 
            "bleed_marks":true, 
            "registration_marks":true, 
            "colour_bars":false, 
            "page_information":false,
            "offset":18.5
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
      "left":12,
      "right":12,
      "gutter":18
    },
"geoBoundsVerso":[127,45,747.256,544.512
    ],
    "geoBoundsRecto":[127,51,747.256,550.512
    ],
    "articleTypeDetails":{
    "undefined":"LAYOUT1"
    },    
    
    "pageColumnDetails":{
        "LAYOUT1":{        
            "openerPageColumnDetails":[
                  {"width":240.756 , "height":639.64,"floatsCited":false,"gutter":0},
                  {"width":240.756 , "height":639.64,"floatsCited":false,"gutter":18}
                 ],
                "columnDetails":[
                  {"width":240.706 , "height":620.256,"floatsCited":false,"gutter":0},
                  {"width":240.706 , "height":620.256,"floatsCited":false,"gutter":18}
                ],
                "openerPageMargin":{
                 "top":48,
                "bottom":95,
                "inside":51,
                "outside":45
                },
            "otherPageMargin":{
                 "top":127,
                "bottom":95,
                "inside":51,
                "outside":45
                }
            }
        },
    "jrnlBoxBlock":{
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
      "singleColumnStyle":true,
      "twoThirdColumnStyle":false,
      "twoThirdWidth":340.85, 
      "horizontalCenter":true
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
        "continuedText": "(<i>Continued</i>)",
        "continuedTextStyle": "TBL_Cont",
        "tableBottomDefaultGap": 6
      },
      "header": {
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
            "before":"jrnlHead1,jrnlHead1_First,jrnlHead2,jrnlHead3,jrnlRefHead,BL-T,NL-T,BL-O,NL-O,QUOTE-T",
            "after":"BL-B,NL-B,BL-O,NL-O,QUOTE-O,QUOTE-B"
         },
        "decrease":{
            "before":"jrnlHead1_First,jrnlHead1,jrnlHead2,jrnlRefHead,BL-T,NL-T,BL-O,NL-O,QUOTE-T",
            "after":"BL-B,NL-B,BL-O,NL-O,QUOTE-O,QUOTE-B"
         },
        "limitationPercentage":{
            "minimum":[40,45,50],
            "maximum":[60,70,80]
            }
    },
    "detailsForVJ":{
        "VJallowed":true,
        "stylesExcludedForVJ":"jrnlAuthors,jrnlArtTitle,jrnlArtType,jrnlAbsHead,jrnlHead1,jrnlHead2,jrnlHead3,jrnlHead4,jrnlHead5",
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
         {"xpath" : "//div[@class='jrnlMetaBlock']", "frame-name":"METABLOCK", "action":"move", "styleOverride":null},
         {"xpath" : "//p[@pstyle='jrnlCVBL']", "frame-name":"CVBL", "action":"move", "styleOverride":null},
         {"xpath" : "//p[@pstyle='jrnlCRBR']", "frame-name":"CRBR", "action":"move", "styleOverride":null},
         {"xpath" : "//p[@pstyle='jrnlTVBL']", "frame-name":"TVBL", "action":"move", "styleOverride":null},
         {"xpath" : "//p[@pstyle='jrnlTRBR']", "frame-name":"TRBR", "action":"move", "styleOverride":null},
         {"xpath" : "//div[@class='jrnlTVTL']", "frame-name":"TVTL", "action":"move", "styleOverride":null},
         {"xpath" : "//div[@class='jrnlTRTL']", "frame-name":"TRTL", "action":"move", "styleOverride":null},
         {"xpath" : "//div[@class='jrnlTVTR']", "frame-name":"TVTR", "action":"move", "styleOverride":null},
         {"xpath" : "//div[@class='jrnlTRTR']", "frame-name":"TRTR", "action":"move", "styleOverride":null},
         {"xpath" : "//div[@class='jrnlStubBlock']", "frame-name":"STUB_COLUMN", "action":"move", "styleOverride":null}
         ]       
     },
    "colorDetails":{
        "undefined":{
            "print":{
                "COLOR1":{
                    "colourType":"process",
                    "colourMode":"CMYK",
                    "colourValue":"0,0,0,90"
                    },
                "COLOR2":{
                    "colourType":"process",
                    "colourMode":"CMYK",
                    "colourValue":"0,0,0,30"
                    }
                },
            "online":{
                "COLOR1":{
                    "colourType":"process",
                    "colourMode":"RGB",
                    "colourValue":"65,64,66"
                    },
                "COLOR2":{
                    "colourType":"process",
                    "colourMode":"RGB",
                    "colourValue":"188,190,192"
                    }
                }            
            }
        },
     "tableSetter" :{
            "table" : {
                "css" : {
                    "font-size" : "8px",
                    "font-family" : "'TradeGothicLTStd', Trade Gothic LT Std"
                },
                "fontPath"  : "TradeGothicLTStd/TradeGothicLTStd.otf"
            },
            "thead": {
                "css" : {
                    "font-family" : "'TradeGothicLTStd-Bold No. 2', Trade Gothic LT Std",
                    "font-size" : "8px",
                    "line-height" : "10px",
                    "padding" : "0px 4.5px 0px 4.5px",
                },
                "align" : "left",
                "valign": "bottom"
            },
            "tbody":{
                "css" : {
                    "font-family" : "'TradeGothicLTStd', Trade Gothic LT Std",
                    "font-size" : "8px",
                    "line-height" : "10px",
                    "padding" : "0px 4.5px 0px 4.5px",
                },
                "align" : "left",
                "valign": "bottom"
            }
        },
        "equation" : {
          "default" : {
              "page":{
                  "size" : "595.512pt"
              },
              "font" : {
                  "size"    : "8pt",
                  "ledding" : "10pt",
                  "path"    : "/TradeGothicLTStd/",
                  "ext"     : "otf",
                  "bold"    : "TradeGothicLTStd-Bd2",
                  "italic"  : "TradeGothicLTStd-Obl",
                  "bold_italic":"TradeGothicLTStd-Bd2Obl",
                  "main"    : "TradeGothicLTStd"
              }
           }
        },    
    "relinkFigures":['LOGO_1.eps'],
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
    }
}