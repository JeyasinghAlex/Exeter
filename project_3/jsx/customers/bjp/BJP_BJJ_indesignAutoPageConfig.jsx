var config = {
    "bookmarks":4,
    "pubIdentifier":"10.1136", 
    "defaultUnits":"pt",
    "baseLeading":11.5,
    "preferredPlaceColumn":0,
    "baseAlignmentItterationLimit":3,
    "floatLandscape":false,
    "floatOnFirstPageForDefaultLayout":true,
    "landscapeFloatOnFirstPage":false,
    "articleTypeNotFloatsOnFirstPage":["undefined","DEFAULT","ARCHIMEDES","EDITORIAL","RWDGTY"
    ],
    "floatTypeOnFirstPage":"KEY,KEY_BACK",
	"tableColumnHeadSpanRule":false,
    "minStackSpace":18,
    "placeStyle":"Sandwich",
    "figCaptionMinLines": 0,
    "applyTableLeftRightBorder":true,
    "applyTableBorderWidth":0.15,
    "applyTableBorderColor":'WHITE',
    "calcParaBoundsForStages": {
        "Pre-editing": true,
        "Typesetter QA": true,
        "Author proof": true,
        "Author revision": true,
        "Revises": true,
        "Copyediting": true,
        "Copyediting Check": true,
        "Typesetter Check": true,
        "Publisher Check": true,
        "Author Review": true,
        "Publisher Review": true,
        "Author Revision": true
    },
    "pageSize":{
        "width":612,
        "height":792
    },
    "exportPDFpreset":{
        "print":{
            "crop_marks":false, 
            "bleed_marks":false, 
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
    "watermark":{
        "Pre-editing":true, 
        "Typesetter QA":true, 
        "Author proof":true, 
        "Author revision":true, 
        "Revises":true
        },
    "wrapAroundFloat":{
      "top":18,
      "bottom":18,
      "left":12.5,
      "right":12.5,
      "gutter":12.5
    },
    "geoBoundsVerso":[71,52,739,544
    ],
    "geoBoundsRecto":[71,680,739,1172
    ],
    "articleTypeDetails":{
    "undefined":"LAYOUT1",
    "DEFAULT":"LAYOUT1"
    },
    "specialLogoDetails":{
        "The-Hip-Society": "BJJ_Hip_Soc_logo.tif",
        "The-Knee-Society": "BJJ_Knee_Soc_logo.tif"
    },
    "pageColumnDetails":{
        "LAYOUT1":{        
            "openerPageColumnDetails":[
                  {"width":189.995, "height":667,"floatsCited":false,"gutter":0},
                  {"width":189.995, "height":667,"floatsCited":false,"gutter":12}
                ],
                "columnDetails":[
                  {"width":240, "height":668,"floatsCited":false,"gutter":0},
                  {"width":240, "height":668,"floatsCited":false,"gutter":12}
                ],
                "openerPageMargin":{
                    "top":72,
                    "bottom":53,
                    "inside":68,
                    "outside":52
                },
            "otherPageMargin":{
                "top":71,
                "bottom":53,
                "inside":68,
                "outside":52
                }
            },
         },
    "jrnlBoxBlock":{
        "KEY":{
            "calcCitationHeight":false,
            "preferredOnCurrentPage":true,
            "preferredOnColumn":1,
            "preferredPlacement":'top'
        },
        "KEY_BACK":{
            "calcCitationHeight":true,
            "preferredOnCurrentPage":true,
            "preferredOnColumn":0,
            "preferredPlacement":null
        }
    },
    "landscape":{
      "singleColumnStyle":false,
      "twoThirdColumnStyle":false,
      "twoThirdWidth":369, 
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
        "stylesExcludedForVJ":"jrnlAuthors,jrnlArtTitle,jrnlArtType,jrnlAbsHead,jrnlHead1,jrnlHead3,jrnlHead4,jrnlHead5",
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
    
    "docFontsList":[
       {
          "Stone Sans ITC Pro": {
            "Medium": {
                "Symbol (T1)": "Regular"
              },
            "Medium Italic": {
                "Symbol (T1)": "Medium Italic"
              },
            "Bold": {
                "Symbol (T1)": "Bold"
              },
            "Bold Italic": {
                "Symbol (T1)": "Bold"
              }
          }
      },
        {
          "Univers LT Std": {
            "47 Light Condensed": {
                "Symbol (T1)": "Regular"
              },
                "48 Light Condensed Italic": {
                    "Symbol (T1)": "Medium Italic"
              },
                "57 Condensed": {
                    "Symbol (T1)": "Regular"
            },
                "58 Condensed Italic": {
                    "Symbol (T1)": "Medium Italic"
            },
                "67 Bold Condensed": {
                    "Symbol (T1)": "Bold"
            }
          }
        },
          {
          "Symbol (T1)": {
            "Regular": {
                "Arial Unicode MS": "Regular"
              },
                "Medium Italic": {
                    "Arial Unicode MS": "Regular"
              },
                "Bold": {
                    "Arial Unicode MS": "Regular"
            }
          }
        }
    ],
    
   "replFonts":[
            {"fontFamily":"Times New Roman", "fontStyle":"Regular"},
            {"fontFamily":"Times New Roman", "fontStyle":"Italic"},
            {"fontFamily":"Times New Roman", "fontStyle":"Bold"},
            {"fontFamily":"Times New Roman", "fontStyle":"Bold Italic"},
            {"fontFamily":"Univers LT Std", "fontStyle":"47 Light Condensed"},
            {"fontFamily":"Univers LT Std", "fontStyle":"48 Light Condensed Italic"},
            {"fontFamily":"Univers LT Std", "fontStyle":"57 Condensed"},
            {"fontFamily":"Univers LT Std", "fontStyle":"58 Condensed Italic"},
            {"fontFamily":"Univers LT Std", "fontStyle":"67 Bold Condensed"},
            {"fontFamily":"Symbol", "fontStyle":"Medium"},
            {"fontFamily":"Symbol", "fontStyle":"Medium Italic"},
            {"fontFamily":"Symbol", "fontStyle":"Bold"}
    ],    
    
    "assignUsingXpath": {
       "toFrames":[
         {"xpath" : "//div[@class='jrnlStubBlock']", "frame-name":"STUB_COLUMN", "action":"move", "styleOverride":null},
         {"xpath" : "//div[@class='jrnlSTLH']", "frame-name":"TVT", "action":"move", "styleOverride":null},
         {"xpath" : "//div[@class='jrnlTRT']", "frame-name":"TRT", "action":"move", "styleOverride":null},
         {"xpath" : "//div[@class='jrnlTRBL']", "frame-name":"TRBL", "action":"move", "styleOverride":null},
         {"xpath" : "//div[@class='jrnlTVBR']", "frame-name":"TVBR", "action":"move", "styleOverride":null},
         {"xpath" : "//div[@class='jrnlCVBL']", "frame-name":"CVBL", "action":"move", "styleOverride":null},
         {"xpath" : "//div[@class='jrnlCRBL']", "frame-name":"CRBL", "action":"move", "styleOverride":null},
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
                    "colourValue":"0,0,0,80"
                    },
                "COLOR2":{
                    "colourType":"process",
                    "colourMode":"CMYK",
                    "colourValue":"0,0,0,15"
                    },
                  "COLOR3":{
                    "colourType":"process",
                    "colourMode":"CMYK",
                    "colourValue":"0,16,20,0"
                    },
                  "COLOR4":{
                    "colourType":"process",
                    "colourMode":"CMYK",
                    "colourValue":"0,49,63,0"
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
                    "colourValue":"88,89,91"
                    },
                "COLOR2":{
                    "colourType":"process",
                    "colourMode":"RGB",
                    "colourValue":"220,221,222"
                    },
                 "COLOR3":{
                    "colourType":"process",
                    "colourMode":"RGB",
                    "colourValue":"253,225,207"
                    },
                 "COLOR4":{
                    "colourType":"process",
                    "colourMode":"RGB",
                    "colourValue":"222,152,102"
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
                    "colourValue":"0,0,0,80"
                    },
                "COLOR2":{
                    "colourType":"process",
                    "colourMode":"CMYK",
                    "colourValue":"0,0,0,15"
                    },
                  "COLOR3":{
                    "colourType":"process",
                    "colourMode":"CMYK",
                    "colourValue":"0,16,20,0"
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
                    "colourValue":"88,89,91"
                    },
                "COLOR2":{
                    "colourType":"process",
                    "colourMode":"RGB",
                    "colourValue":"220,221,222"
                    },
                 "COLOR3":{
                    "colourType":"process",
                    "colourMode":"RGB",
                    "colourValue":"253,225,207"
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
                    "font-size" : "7px",
                    "font-family" : "'Univers_55', Univers55"
                }
            },
            "thead": {
                "css" : {
                    "font-family" : "'Univers_45_Light_Bold',Univers45Light-Bold",
                    "font-size" : "7px",
                    "line-height" : "9px",
                    "padding" : "4px 4px 4px 4px"
                },
                 "fontPath"  : "Univers/Univers_45_Light_Bold.ttf",
                "align" : "left",
                "valign": "top"
            },
            "tbody":{
                "css" : {
                    "font-family" : "'Univers_55',Univers55",
                    "font-size" : "7px",
                    "line-height" : "9px",
                    "padding" : "4px 4px 4px 4px"
                },
                "fontPath"  : "Univers/Univers_55.ttf",
                "align" : "left",
                "valign": "top"
            }
        },
     "equation" : {
          "default" : {
              "page":{
                  "size" : "492pt"
              },
              "font" : {
                  "size"    : "9.5pt",
                  "ledding" : "11.5pt",
                  "path"    : "/TimesNewRoman/",
                     "ext"     : "ttf",
                  "bold"    : "TimesNewRoman-Bold",
                  "italic"  : "TimesNewRoman-Italic",
                  "bold-italic":"TimesNewRoman-BoldItalic",
                  "main":"TimesNewRoman"
              }
           },
           "jrnlTblBlock" : {
              "page":{
                  "size" : "492pt"
              },
              "font" : {
                "size"    : "7pt",
                "ledding" : "9pt",
                "path"    : "/Univers/",
                "ext"     : "ttf",
                  "bold"    : "Univers_45_Light_Bold",
                  "italic"  : "Univers_55_Italic",
                  "bold-italic":"Univers_45_Light_Bold_Italic",
                  "main":"Univers_55"
              }
           }
        },
    "stubColObj":{
        "top": {
            "SpecialLogo": false,
            "STUB_COLUMN": true
        },
        "bottom": {
        "METAINFO":false
        }
    }
}