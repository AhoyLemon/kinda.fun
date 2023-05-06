const allWarrants = {
  "0101": [510,2569,1548,1798,2295,770,1233,1483,1054,1294,1344,452,2207,987,804,1401,878,1543,1409,1196],
  "0102": [1845,459,2133,1754,684,554,393,2362,1574,766,2224,863,550,1996,2059,1902,72,703,800,1953],
  "0103": [2335,1221,2147,2363,1538,58,1369,650,795,719,868,528,1337,447,1965,2366,2477,1976,621,1630],
  "0104": [2305,2526,2089,910,1507,1531,1307,929,2076,1503,938,1847,1407,443,373,149,1577,1193,536,739],
  "0105": [1256,2415,2057,1,620,1218,1437,2033,12,416,2196,214,2093,2052,834,5,943,878,1004,1477],
  "0106": [1647,383,1864,1198,2173,2226,2261,1828,1897,176,1800,2082,1473,1770,2095,1822,2023,758,2432,2263],
  "0107": [661,1097,2009,361,388,2058,278,141,959,1510,1031,17,1021,125,7,2476,853,2148,927,1731],
  "0108": [1158,107,1606,469,533,1252,766,1362,1294,798,441,1462,535,2404,1211,850,2179,213,2467,1746],
  "0109": [1822,1742,1004,1217,4,676,267,51,2303,227,1853,1540,2447,587,1577,905,1366,1701,2166,442],
  "0110": [2574,2242,629,2505,698,2071,684,2478,2134,1442,2121,284,1736,2503,224,1362,1918,44,330,780],
  "0111": [274,2393,2148,1222,997,558,1162,2349,342,2106,266,1489,2544,1268,1073,1040,886,2565,1695,1572],
  "0112": [356,349,2019,1469,2485,1209,1750,1640,1861,203,466,133,533,1485,1087,184,1264,1762,1658,1334],
  "0113": [1279,2270,765,1827,499,1006,334,542,1254,2242,2217,644,2453,989,2177,1125,1934,2416,479,2110],
  "0114": [293,874,1790,2560,1552,703,221,1840,1170,996,2339,1428,2377,2295,1328,2410,2071,1982,1826,174],
  "0115": [831,1253,1735,2403,414,1058,355,2398,1465,2285,839,1804,918,1300,794,1363,1304,1915,2067,1275],
  "0116": [2113,775,182,996,1487,1001,2021,789,885,1180,1796,1618,2401,1606,2561,1532,2480,953,490,2116],
  "0117": [86,2525,1453,2230,1729,1738,1662,1002,1887,2101,675,1641,2482,2148,1961,312,1045,1185,2310,2422],
  "0118": [1836,126,1617,2248,937,1947,1005,511,392,1206,1273,877,191,92,2556,1717,1241,542,207,33],
  "0119": [87,1078,1906,973,2205,2458,42,582,716,956,929,2349,879,1458,1855,1939,492,328,1566,673],
  "0120": [75,1417,1097,518,65,584,1671,2461,228,390,46,1769,2565,365,888,2352,1102,2044,555,1991],
  "0121": [1316,2302,2373,1065,650,1552,1239,2474,1336,506,342,1935,1921,4,748,869,2518,2029,2166,2165],
  "0122": [2483,2003,577,538,1304,283,1841,1956,702,1408,250,1355,2369,2230,1208,995,2320,3,2584,1545],
  "0123": [1464,2056,604,1389,1786,103,389,411,921,228,2363,1441,352,1513,1432,1807,475,775,760,2543],
  "0124": [1978,2029,550,1905,91,1037,1798,599,358,2376,2309,925,1416,399,1125,301,1776,1006,876,2556],
  "0125": [655,1938,1085,2401,237,425,127,320,363,1672,1801,1958,505,1681,348,1846,1604,433,1158,509],
  "0126": [920,2343,2394,429,2116,2085,225,2559,354,771,2190,1203,704,2466,1478,1288,561,246,1927,1318],
  "0127": [498,566,1236,596,2107,467,2381,1939,852,1044,84,1327,756,1572,798,1444,158,2449,1340,2135],
  "0128": [735,902,654,780,749,1249,122,1646,2198,2024,553,2522,374,1293,2124,1778,1704,487,298,921],
  "0129": [1427,1878,2009,980,1756,1097,695,1851,578,1224,1678,698,2390,2301,1934,2173,1954,1557,1845,1413],
  "0130": [1703,1764,2530,1399,364,2465,2052,1339,462,735,2154,1189,1814,44,397,1803,267,371,2010,2401],
  "0131": [843,510,6,225,1642,90,648,865,106,825,376,1936,451,2307,278,2094,2372,939,1058,2509],
  "0201": [217,786,2260,658,2093,1799,1365,899,2316,2141,955,175,66,550,561,923,2016,450,2189,44],
  "0202": [1626,773,717,1943,2345,744,510,2494,1221,1710,2284,246,1004,2119,290,1383,1467,1421,1135,49],
  "0203": [2301,1863,840,444,2036,1016,407,1478,455,1003,2238,1364,1935,1181,1844,2096,2406,317,389,1636],
  "0204": [1897,2095,2563,1,2002,1142,1806,1746,138,1602,1637,1908,1556,2295,1300,2015,1097,988,639,1363],
  "0205": [965,312,910,307,465,2168,1423,1287,720,2018,923,2037,2414,2142,283,643,389,1387,2031,2463],
  "0206": [1396,1378,1874,1191,2077,1406,480,2390,754,2573,1635,1235,1849,291,1682,784,1786,1934,2004,2404],
  "0207": [1099,1229,2468,772,1850,927,1211,717,1766,2135,1769,126,1069,1450,914,2228,1262,415,601,1938],
  "0208": [2214,1951,1383,142,304,1235,1404,1359,409,1014,508,1956,26,1727,1194,811,390,1890,1310,715],
  "0209": [184,1347,1865,733,564,1831,1659,2045,1801,546,2010,882,194,916,174,1601,1338,2533,967,1525],
  "0210": [671,1276,1639,1938,2,96,613,1392,161,856,1327,1838,550,2161,11,2312,2104,2431,1778,1041],
  "0211": [1332,1666,1452,327,1762,2113,1581,333,1031,741,2271,1513,2349,457,2475,1211,367,1884,1829,852],
  "0212": [2188,2066,1126,1481,2537,2384,907,483,1029,547,1806,2483,780,245,1348,2360,2476,2013,1629,396],
  "0213": [1964,2098,821,1665,1043,1388,1888,214,1727,2109,2365,2351,751,938,2543,383,1180,858,658,839],
  "0214": [1482,1608,1634,1407,1318,1724,441,1172,2424,1539,926,138,2465,2044,1738,1778,97,1048,793,1473],
  "0215": [2599,1002,1334,596,876,522,605,1671,809,206,1907,763,2579,1167,828,2009,1130,1835,1920,905],
  "0216": [1375,1382,56,1014,2319,329,2295,1728,1659,1860,2069,546,1401,429,1662,378,598,1905,1522,649],
  "0217": [419,428,2513,2360,1852,1067,1629,400,1828,910,1663,876,1149,2193,1080,1738,2088,222,230,1566],
  "0218": [106,2436,326,765,1424,1492,1612,506,1991,1569,219,594,2118,1758,507,1930,2190,1293,2200,1162],
  "0219": [1799,1040,2219,1587,1628,2377,766,554,1699,334,2578,1631,134,574,2211,1787,2116,1498,1744,1084],
  "0220": [1370,297,1891,2236,782,1503,1130,1126,2193,1875,473,2001,340,1298,754,2024,255,2153,859,2449],
  "0221": [158,185,239,2316,1361,1884,2194,1276,2498,30,2151,973,2395,1586,244,2176,1901,323,1845,347],
  "0222": [704,100,1154,54,2105,1812,1626,29,160,2500,2299,886,2099,789,1354,393,2479,1880,2336,1858],
  "0223": [1834,2119,1745,1321,1035,627,352,1998,2075,1924,2487,742,2214,1157,2442,790,1890,465,462,1532],
  "0224": [1228,2599,1258,812,593,1040,1482,136,828,1318,194,1173,640,292,1727,1354,1194,809,2124,811],
  "0225": [1316,390,2107,1763,2585,1085,1346,189,458,684,167,432,249,1830,1447,2447,2082,2444,1502,1160],
  "0226": [180,2515,931,938,1422,1814,2001,2111,448,316,516,1581,1706,2596,2556,1623,2545,720,1654,255],
  "0227": [2500,326,400,1105,918,694,418,1116,359,1876,1271,1689,1911,2498,710,995,1099,2269,594,2150],
  "0228": [1591,19,1285,821,1138,1009,1612,2209,679,1070,1819,1038,698,2224,924,443,1500,1644,132,2061],
  "0301": [449,2565,2327,2355,1305,1052,506,2145,534,16,595,912,1367,642,2340,2575,2212,1887,983,2166],
  "0302": [1192,963,646,733,287,1984,948,886,1068,2216,2274,2366,2252,2548,2374,1662,2582,49,1105,1655],
  "0303": [1928,465,444,2007,2335,1959,1701,2327,1674,1016,847,1854,2143,1793,813,2587,2227,2124,1073,276],
  "0304": [53,2147,779,309,1232,244,280,2182,2409,1560,1923,403,2549,277,1382,1996,2129,2018,1149,928],
  "0305": [1152,1458,1665,2579,1797,2380,431,1541,496,2321,2163,988,470,1222,131,1192,811,266,2236,301],
  "0306": [1332,214,2448,2278,507,664,2005,1611,1435,161,2369,906,1439,2283,1856,2331,251,859,2387,1673],
  "0307": [1032,1363,698,389,1450,785,2178,2239,1357,126,2461,1390,2439,2527,1462,2009,1130,685,868,1178],
  "0308": [2313,1697,2019,296,918,1703,884,341,2025,1391,274,2061,504,573,1177,1422,1006,397,1374,1361],
  "0309": [582,1584,690,2516,425,1791,1606,1009,2335,900,1550,468,428,1148,579,1176,2383,752,2435,1010],
  "0310": [111,117,894,1993,2568,1827,660,2079,1382,555,982,1739,236,521,1069,1543,1054,2350,1960,2156],
  "0311": [53,1895,1808,1975,1528,491,2513,1418,1048,1138,1784,1996,1745,120,1427,1292,2480,2263,200,2551],
  "0312": [481,2534,882,411,530,2010,308,92,1524,66,357,844,809,877,1251,2273,1917,1634,54,36],
  "0313": [2311,518,194,2470,2017,1040,2112,594,386,1684,2299,2586,1955,716,77,3,2313,1313,804,1740],
  "0314": [2595,1339,2170,2329,1409,1980,879,56,1030,430,99,2429,512,707,435,1820,2576,1297,2542,60],
  "0315": [328,1814,1261,1988,2290,765,1998,640,1000,797,2166,805,1783,332,171,677,1869,1206,1746,956],
  "0316": [1262,489,153,1926,1362,1268,2,1426,2583,1752,1239,2072,2335,2202,534,1924,2543,995,2216,1585],
  "0317": [2557,203,2541,908,1269,1711,695,2409,751,2515,1764,1188,1729,1065,481,2486,914,283,1112,2298],
  "0318": [793,413,1895,478,1084,2422,997,595,2372,628,1935,2274,584,2461,734,2167,2349,2540,315,1633],
  "0319": [1314,1166,1142,602,56,2292,701,717,2600,390,2231,2105,258,1116,2448,2315,550,82,1132,1361],
  "0320": [2543,2223,835,1435,4,166,2545,670,2480,1414,1347,644,141,2494,1803,2158,2492,799,2225,907],
  "0321": [2464,191,1483,2488,2246,1030,2321,1249,1091,2026,2269,249,217,288,1280,1490,373,137,568,2577],
  "0322": [1108,1136,823,2554,1632,2178,31,2105,1733,1410,1157,1246,2586,991,1510,2256,1505,2339,693,908],
  "0323": [385,2597,1124,353,940,1741,963,2397,758,2101,1996,103,1734,9,970,1356,480,496,1558,2253],
  "0324": [1104,1094,1484,1145,348,401,2566,1995,941,726,1638,2066,2402,235,646,2305,1516,2099,686,2346],
  "0325": [324,1273,2264,1195,1949,256,2150,1807,1558,1971,2070,1944,1181,1576,869,995,232,1414,1993,247],
  "0326": [2318,281,1246,2228,1435,2234,777,799,660,2028,1619,1916,2485,520,436,1043,1057,1051,1310,2523],
  "0327": [811,2411,1508,267,968,2451,590,1172,969,848,1113,824,15,936,168,1423,1154,1633,185,1915],
  "0328": [880,258,214,2048,1908,2334,1600,530,1581,112,548,430,2462,1223,1572,17,2006,1891,1308,643],
  "0329": [838,1100,1481,1333,2260,1837,979,1437,1604,835,1750,44,340,2549,295,130,489,172,2310,922],
  "0330": [2081,186,1231,2361,4,1472,2252,1513,2293,96,1564,1893,615,1207,284,2062,185,864,2021,442],
  "0331": [2532,1519,2308,709,2368,2084,1034,1000,1858,2282,690,2055,506,1244,1113,352,456,1380,1999,992],
  "0401": [1475,1093,1315,1882,1603,341,1421,1273,1418,2232,2178,2018,2058,869,2594,1169,2328,743,1840,1473],
  "0402": [107,2109,2288,902,1955,842,99,541,661,2491,1069,1798,2055,585,904,1467,1073,161,888,900],
  "0403": [476,898,1829,2245,734,1469,2549,2366,793,27,567,956,49,491,406,823,1511,1965,624,1718],
  "0404": [569,145,2356,84,2243,1458,1597,2073,1867,1680,481,2518,1949,1239,1148,732,1191,411,2219,1892],
  "0405": [2357,876,1386,1286,1725,2071,281,250,786,975,1706,1330,1797,703,414,548,979,855,488,1036],
  "0406": [1240,286,549,2182,587,1074,1261,1139,1132,2128,1206,2080,54,2214,1163,1821,1938,2263,2524,1467],
  "0407": [522,835,2240,1469,831,186,1068,660,58,2318,1273,2274,1426,1029,2086,808,212,2382,1759,2344],
  "0408": [1071,2220,383,1289,939,870,1532,1703,2214,1371,1490,1565,2470,1090,517,321,332,111,1207,1959],
  "0409": [696,960,2344,1037,2299,83,740,590,736,1006,543,2494,1495,2287,1643,891,2013,1916,1376,436],
  "0410": [1460,614,1133,1393,2005,1836,1060,2346,2222,1984,1485,1801,1049,1169,952,202,78,1387,1954,252],
  "0411": [2244,1656,1756,1582,2184,1923,1921,2389,717,389,586,406,1311,1392,223,2343,1187,1931,1520,2303],
  "0412": [2078,175,843,1459,1507,2500,2595,2230,1182,1959,294,1759,927,2548,2438,721,847,1518,312,2287],
  "0413": [935,2341,2205,877,1490,874,1188,2378,1290,754,1379,2,2520,1726,796,1895,518,934,338,1329],
  "0414": [752,1963,2525,324,2555,756,1598,102,1891,431,949,993,2198,2331,1776,2035,1719,1634,1505,1163],
  "0415": [2024,404,1395,964,1646,230,2600,1819,1076,1894,208,1930,231,1961,368,1580,2069,2351,1007,2169],
  "0416": [2413,2211,2297,1042,527,1821,877,274,1344,913,2290,2222,2386,2122,1695,986,1024,782,412,1471],
  "0417": [2583,1103,2422,524,398,1671,1165,2521,870,2252,1964,2181,257,2146,816,2179,1309,484,2043,1364],
  "0418": [1078,2007,2009,2591,734,2557,1027,637,243,1866,2216,198,636,720,455,1460,1753,396,235,2162],
  "0419": [939,322,407,32,1793,138,1321,94,480,367,697,1755,122,522,1936,227,255,384,2411,1818],
  "0420": [1970,2286,2057,1635,1721,2104,842,1528,745,2256,2242,1432,1468,319,2060,1609,185,550,881,442],
  "0421": [717,2135,2396,1200,662,2271,2508,2099,143,501,1211,2411,457,1035,2214,2216,578,647,779,803],
  "0422": [388,281,1930,2314,1182,885,1456,2108,1629,1481,1958,1321,1264,269,2343,1658,2011,820,1569,1856],
  "0423": [2204,2514,1271,493,40,1826,37,922,1233,1982,409,1150,152,764,1167,2462,361,2474,1086,910],
  "0424": [1181,646,545,2307,1938,448,1575,209,438,6,474,2350,965,1265,275,295,1656,293,1066,1511],
  "0425": [1894,2102,2278,395,151,1320,1332,1133,375,2198,1379,2229,721,2351,540,1076,786,1946,1240,2177],
  "0426": [1738,1869,1756,1999,1839,528,347,84,1171,1327,287,1357,416,1277,2491,876,1036,176,1508,1023],
  "0427": [1618,774,67,1552,1199,897,249,2459,1619,2180,1077,1807,27,1567,50,1828,525,151,2178,19],
  "0428": [2590,1797,565,383,1737,1021,1702,1625,1385,922,2599,2503,1781,1939,1951,267,2177,2580,2283,30],
  "0429": [2403,189,2182,849,598,156,373,879,1736,100,444,2464,361,1958,1137,2582,887,1083,2243,1787],
  "0430": [1448,2430,2518,908,469,2046,1756,2085,2499,26,1303,1311,2289,244,2296,1587,674,1625,42,2585],
  "0501": [1469,2464,2361,1524,253,2112,576,461,1662,508,1081,2232,1180,287,549,2237,127,1953,1914,221],
  "0502": [1752,779,2216,1788,37,1638,1276,354,210,2172,2093,601,2545,1713,1667,1111,171,191,1810,336],
  "0503": [749,1618,462,1599,1520,195,2484,2016,2541,2486,1137,537,638,1167,1082,815,320,795,2473,166],
  "0504": [2232,542,2502,2507,529,1719,193,968,79,1791,1868,81,710,1823,2070,163,1400,838,1810,1741],
  "0505": [1187,279,2127,672,1894,587,2345,388,662,816,70,1749,643,2495,1858,626,1933,1385,2028,2242],
  "0506": [2600,2592,2543,2215,2248,2240,2148,2099,2045,2021,1800,1761,1738,1656,1584,1549,1514,2368,1466,1444],
  "0507": [2084,2086,2461,2549,520,2131,2355,2375,599,1048,1852,1097,299,1609,2061,897,1219,1323,1859,802],
  "0508": [2544,1934,1800,430,1933,1155,1472,1204,1361,2047,956,26,484,1725,507,2191,2093,1199,1331,918],
  "0509": [1106,600,1891,96,1860,1411,2407,1663,966,929,1246,2200,336,2441,664,2021,37,1532,233,718],
  "0510": [2522,2390,1404,934,320,1938,1557,1185,1760,1526,341,1002,1854,2395,1790,59,472,2561,1003,722],
  "0511": [1413,1238,1590,1940,1462,2467,2431,51,928,2211,1407,385,166,2029,497,1627,802,1581,1881,1850],
  "0512": [362,1008,305,1091,619,815,580,1551,1775,2572,1972,2290,2409,2434,1803,1141,1285,1353,2449,1876],
  "0513": [1255,1804,224,2078,2388,2594,2220,1016,1480,595,865,1952,1485,881,1611,1710,1933,1557,170,745],
  "0514": [830,145,1337,2359,98,2413,1603,106,134,608,732,1794,1595,1560,136,795,657,2249,1696,201],
  "0515": [199,1797,959,1427,1089,2103,1924,519,2196,850,254,1927,1509,1216,367,2161,1788,444,2471,2392],
  "0516": [2258,1721,344,2015,172,227,800,2216,179,2152,994,2476,1839,1519,1217,2237,1146,191,809,2554],
  "0517": [149,662,2108,1162,1785,119,393,2247,1248,526,2202,783,2093,1340,1320,862,2437,2251,859,2024],
  "0518": [175,400,1048,2055,722,490,2127,61,29,2115,271,2275,899,945,2302,322,1215,854,1146,809],
  "0519": [1273,2186,168,2298,2285,152,2535,1448,2110,1959,2021,2252,63,393,2435,2573,2283,1002,2390,2005],
  "0520": [27,367,2547,1375,1788,369,460,1811,1778,1262,1212,1197,2262,306,1152,225,913,580,575,963],
  "0521": [2374,2319,2538,707,32,1516,748,771,393,1845,296,2184,1352,812,1597,347,1268,2545,1601,1753],
  "0522": [1269,1616,81,266,2432,1552,1529,1874,2174,1497,1436,1911,2222,640,1467,1061,1952,2598,2371,1675],
  "0523": [403,1262,1278,2243,562,918,763,1860,611,321,1699,145,2285,592,781,1389,2100,583,621,158],
  "0524": [518,1109,418,739,2572,1611,663,1104,1263,1715,124,78,2120,636,2037,697,337,1530,875,123],
  "0525": [174,1469,198,2038,1779,478,1455,1402,1606,903,844,1403,2448,1356,1891,262,147,710,1859,1786],
  "0526": [1883,1301,1522,1164,2220,2099,1483,52,790,360,724,2117,536,690,1271,1226,615,2295,1931,2522],
  "0527": [293,432,24,830,1969,2360,1272,46,2404,998,902,715,806,964,1571,2010,678,863,595,1108],
  "0528": [790,2315,153,1424,139,948,1674,1164,203,2273,2528,2573,2079,2430,2558,526,1363,2474,762,1727],
  "0529": [404,74,2531,2443,429,2184,2564,2360,2114,641,2290,571,739,490,473,1668,1635,2041,870,1290],
  "0530": [826,583,1249,2483,2506,1939,121,2338,199,412,1802,127,535,371,1970,1622,2073,1662,2585,1169],
  "0531": [86,2285,1476,457,867,727,1091,2299,1477,1308,1377,782,2520,453,1072,2153,1374,382,776,43],
  "0601": [309,1227,710,1462,2527,324,1977,728,1327,1583,447,1813,1103,1906,208,316,2296,945,1722,2387],
  "0602": [2143,1472,1547,890,812,145,1656,2161,436,2113,1134,2300,2010,2346,1264,2035,1132,1088,955,1287],
  "0603": [1711,1910,1380,2447,1853,1557,288,317,875,702,1054,2423,2331,1821,1524,18,2028,563,0,2152],
  "0604": [1879,2198,1491,473,481,426,634,1767,589,1177,944,795,1390,2587,205,2400,2135,1076,602,2597],
  "0605": [672,1595,1591,891,2003,2216,2394,1448,272,621,1716,1798,351,1904,2340,1049,1375,500,1637,1373],
  "0606": [2178,1129,1060,1772,1322,2565,1268,736,1769,1747,741,650,1766,384,97,1506,523,522,2111,2444],
  "0607": [1465,1178,1147,42,2036,776,1568,2346,936,2174,1161,139,2515,1797,1266,1726,2551,2428,482,2044],
  "0608": [2418,523,1370,1387,1854,1222,2368,2193,986,2257,1910,1583,786,1139,1563,2017,2373,621,2177,1183],
  "0609": [1242,1944,1665,1229,2231,1257,277,352,2161,912,2453,605,909,1202,635,838,985,44,2452,2324],
  "0610": [842,439,70,1310,246,1761,2083,1255,1436,864,1272,80,15,1192,2534,428,2258,1689,216,2549],
  "0611": [953,146,417,1933,1711,657,1501,2330,2238,26,2041,976,544,117,752,356,1683,1073,1635,882],
  "0612": [1151,87,1934,2108,957,1412,1135,415,2022,2208,925,1011,1399,819,949,1113,2168,2249,1785,635],
  "0613": [2178,2402,267,278,665,385,1162,859,645,806,2015,203,2422,121,259,2257,2410,1145,767,403],
  "0614": [162,2469,1505,2353,858,1611,852,1064,2361,1360,696,1764,269,1948,1707,1596,1802,496,2506,1994],
  "0615": [1202,2026,1436,663,1464,1410,703,102,1951,2485,1492,1008,237,1359,2584,634,1498,1054,1617,1484],
  "0616": [804,1986,487,1482,564,168,655,1620,2039,1666,1709,195,2581,1362,577,368,536,2288,622,2161],
  "0617": [1316,2432,1287,1405,543,815,1484,889,609,677,2390,2240,643,1188,1783,658,795,1081,522,813],
  "0618": [187,1141,1145,1068,490,2571,1953,1351,1857,358,2454,337,1352,1887,57,721,2482,2412,1337,264],
  "0619": [940,2565,1897,1295,1975,1303,1005,82,853,1369,2037,1107,2056,605,1053,791,364,2012,2459,1355],
  "0620": [336,233,1985,564,736,216,1540,1287,2093,2451,360,1531,2222,1166,847,1905,117,1311,198,1254],
  "0621": [454,700,2008,205,2133,775,498,1525,2183,1617,91,2477,2540,839,28,1405,173,794,1893,515],
  "0622": [111,2180,641,181,45,2225,1112,1189,153,859,1414,167,2295,1212,2538,1691,2575,1604,1370,861],
  "0623": [2092,41,2283,852,1451,1151,1915,162,1416,392,633,1012,129,2338,796,2399,2157,466,2499,949],
  "0624": [312,657,710,1020,302,2530,1245,1358,658,417,1710,88,1361,755,1723,1686,2282,1494,855,459],
  "0625": [1072,193,1425,161,1990,1882,911,2178,633,1290,1464,141,957,785,21,1006,2318,1037,2477,469],
  "0626": [1120,605,1159,517,331,1742,1498,2595,967,1969,2540,710,409,2258,52,1164,1524,700,417,1260],
  "0627": [546,1506,900,902,157,2395,959,1439,2576,135,2188,1754,559,806,2054,2251,1719,1630,296,2131],
  "0628": [396,2463,2302,497,2487,1713,1217,2586,2358,2267,315,1525,918,528,2209,2583,1986,1389,1726,769],
  "0629": [1499,1665,1113,713,621,1119,1468,1500,2277,206,518,1342,1688,665,2193,824,2141,1062,122,1185],
  "0630": [1404,1038,457,427,930,210,2356,157,1174,1379,175,778,1900,1447,765,1237,386,1415,453,2177],
  "0701": [980,590,1533,663,1427,2118,509,2040,144,2467,8,1960,1769,1204,2459,630,1043,1443,1685,1842],
  "0702": [1243,2408,1937,1170,1704,1588,2416,66,1548,261,888,2409,1279,1893,1089,988,1918,601,1568,2536],
  "0703": [543,643,2148,458,1688,1293,2265,883,1322,2219,1672,190,1195,1836,1033,1530,785,719,1978,18],
  "0704": [30,1600,1924,1147,225,1006,770,302,2205,899,2458,97,1564,998,1831,453,2034,1868,17,802],
  "0705": [989,2459,872,2019,1684,2485,31,1837,1186,305,1985,641,837,546,2483,2094,456,2375,2470,2377],
  "0706": [630,1990,1573,1069,1668,1921,1639,1934,150,1902,718,2009,191,1380,769,1753,701,119,559,2122],
  "0707": [256,1031,2457,253,1236,676,563,1436,846,2275,1750,539,2474,1946,147,827,795,201,2371,1613],
  "0708": [2590,1583,1032,181,1370,71,2399,46,1359,756,673,209,1841,1453,2086,2016,342,2518,411,1385],
  "0709": [657,2146,1437,866,1995,2426,1555,880,622,2102,599,1041,290,795,2128,2577,1771,30,525,1372],
  "0710": [267,1878,1499,1010,1425,1966,2214,1391,1993,2298,1266,2256,1315,2547,1459,680,2559,2483,2504,2303],
  "0711": [1509,922,2362,1807,1360,2034,1976,232,2199,1757,1483,179,2193,174,2461,2425,587,2310,416,918],
  "0712": [864,197,1249,2184,653,1372,1026,939,742,2549,2004,2152,312,1721,2243,549,946,651,1334,2594],
  "0713": [715,2577,1520,363,1775,2009,2223,387,593,436,1761,1842,2425,1031,2077,2248,1936,438,1640,836],
  "0714": [1914,567,1917,1193,1003,331,2017,742,1698,1757,253,2442,971,2291,143,351,1286,1359,2554,240],
  "0715": [1778,731,609,73,2331,1252,329,999,1373,1439,8,2535,1255,1636,1609,1504,2343,581,1412,1207],
  "0716": [2057,740,1999,14,1177,429,2499,2010,1983,484,297,2294,2332,762,2524,42,1843,592,738,1167],
  "0717": [2237,2540,305,2349,2158,1972,2086,1816,867,812,1100,1464,991,1130,2470,722,307,1470,2190,98],
  "0718": [465,665,945,646,2130,2505,1939,2145,1267,1562,2140,95,1497,742,2516,1354,757,1770,1274,1031],
  "0719": [731,321,1650,2057,295,859,332,2485,2287,1195,2190,29,2273,1346,119,2411,699,655,2313,2044],
  "0720": [956,1088,1551,1986,1383,1255,2175,1196,1523,1311,1408,868,65,474,1138,559,1862,2035,2193,797],
  "0721": [1867,2112,1996,80,2018,1323,415,2048,136,215,974,575,1098,2045,1948,850,1500,670,2221,2252],
  "0722": [1417,1806,2275,2575,1604,366,1277,734,487,1366,849,946,1078,1148,461,394,1198,2084,1436,625],
  "0723": [665,2437,970,2556,1112,2507,2226,855,2529,1901,972,1883,359,642,674,1068,1449,382,587,1401],
  "0724": [575,1765,406,2311,1603,1417,588,504,2076,1040,2542,253,2426,1318,549,828,2287,644,2219,1562],
  "0725": [1738,1644,871,2555,1372,1910,912,1371,1660,1969,1946,2373,1439,594,728,2505,2573,618,1974,1200],
  "0726": [369,1493,2326,2236,86,729,1828,693,769,847,1877,1012,1591,2307,1478,2455,1060,2239,1091,507],
  "0727": [1500,1911,2253,649,1272,683,1838,437,269,2121,824,1949,2267,760,133,1481,1973,569,2376,618],
  "0728": [440,1914,2337,881,863,1240,890,2143,1990,1420,907,1789,459,645,1148,1613,423,2598,233,478],
  "0729": [1951,1418,2351,1084,1701,2289,886,1742,788,2283,2507,1680,616,1481,1151,523,1543,1133,1626,1083],
  "0730": [2077,197,1634,1478,402,677,2474,1939,1312,1659,428,458,609,1950,1600,963,919,53,238,2191],
  "0731": [469,871,201,1404,1805,929,2553,2417,899,1364,1249,822,1128,1125,1521,39,2327,969,603,346],
  "0801": [440,2254,783,1499,2350,2157,1183,1133,2497,2492,739,388,360,741,1679,1915,43,815,200,829],
  "0802": [2283,590,167,1414,2375,1863,2306,2116,365,1928,1674,209,2218,667,243,221,2079,1121,898,2360],
  "0803": [893,2108,289,1722,587,2327,43,1116,1904,2157,1157,2069,2238,1203,2168,1859,1260,627,264,271],
  "0804": [615,1151,1038,1580,2475,280,1297,276,909,733,15,105,776,824,1772,2065,989,2516,966,1579],
  "0805": [509,244,1786,2441,2210,2452,549,1099,2063,956,2152,2574,553,963,2161,1264,995,1298,949,371],
  "0806": [672,2259,1659,2455,2145,263,146,1424,1577,2147,835,2457,2157,1468,512,1008,596,59,1483,1709],
  "0807": [460,962,671,2171,2005,2183,289,1863,1612,18,592,1391,1485,1057,2290,679,2305,161,550,1186],
  "0808": [1817,868,124,2412,654,207,2588,1846,686,2300,910,1253,1494,317,2597,2534,1366,92,134,1032],
  "0809": [22,282,2121,1840,2229,1459,1980,1959,677,2420,2327,1182,2091,2530,536,1707,569,709,1706,428],
  "0810": [444,2313,949,37,790,1495,1938,836,334,134,2395,546,2202,39,145,1785,1783,839,1642,2489],
  "0811": [2268,1955,24,1249,1745,224,771,688,2003,549,2174,564,2116,2311,1923,1429,2334,828,1939,1536],
  "0812": [617,475,2084,1798,1333,400,570,1879,905,1728,2152,1960,1974,1239,347,956,2518,1374,724,287],
  "0813": [428,1591,1063,2138,1441,1945,1223,2136,2586,380,1543,1165,1107,2002,1417,1468,1793,2135,340,2284],
  "0814": [2311,795,441,159,101,1298,2426,1664,1700,928,2385,984,2143,4,1112,2327,2600,1415,2216,359],
  "0815": [1827,255,2503,687,477,987,2036,1555,2071,81,1272,1164,2084,2049,926,979,1753,953,305,1542],
  "0816": [0,837,383,1942,2331,2279,1400,1955,2426,1925,790,1432,1426,963,873,1852,2081,811,123,1876],
  "0817": [1279,765,45,828,499,536,745,1287,1827,2506,10,1685,298,1346,1770,2016,1345,241,693,329],
  "0818": [623,563,2073,967,1037,259,1602,1271,1740,1453,634,1854,1165,1629,262,2600,1549,892,532,786],
  "0819": [542,919,2246,2554,908,1525,2365,2473,119,1215,2495,405,1929,2371,475,768,496,2217,1242,614],
  "0820": [1037,1315,1919,2155,2338,83,1203,1620,1438,1735,2587,1552,2175,921,1454,826,1265,532,2005,198],
  "0821": [700,2503,1724,1499,453,170,1207,475,521,2112,372,2312,639,1396,145,1982,2006,740,2528,1935],
  "0822": [798,2415,1051,1615,1143,1225,680,2248,720,169,1936,1566,2235,1047,1521,2444,1862,2107,1276,348],
  "0823": [116,92,964,2547,1171,286,1541,1107,1878,1928,1546,36,2548,1221,1976,1694,340,1449,2186,639],
  "0824": [2419,1827,2204,85,223,786,813,312,1981,2465,2409,1463,1065,442,2306,2319,869,138,1122,287],
  "0825": [1559,2312,761,1512,2299,2189,1792,702,1823,2412,1034,2275,1382,1184,2071,1938,1828,1164,2229,1751],
  "0826": [435,1067,1403,692,2382,2092,1504,1131,101,1113,367,2352,1439,2547,2068,1722,1819,868,2251,215],
  "0827": [1437,2034,288,698,1910,1712,1692,722,1580,799,1624,723,1300,2114,921,1633,1401,2449,1269,1493],
  "0828": [657,2292,2283,2270,514,133,2501,547,2089,2579,2500,1810,149,1452,853,2244,104,1469,743,2382],
  "0829": [712,519,555,1497,761,1293,2048,1886,643,669,2063,1125,2503,2480,1246,1923,966,1890,384,2565],
  "0830": [1607,550,66,1717,540,282,1196,948,1364,220,408,1503,418,2232,218,747,2352,445,2086,2514],
  "0831": [1876,888,1349,1168,274,1138,108,1361,1841,89,6,2312,1994,223,95,1764,738,188,1746,580],
  "0901": [173,1159,86,2325,2529,2102,769,1274,2008,2065,1696,2055,1260,1302,2468,624,655,388,2053,1827],
  "0902": [1688,1424,662,2541,727,772,474,1649,1079,174,2258,1164,1657,1604,123,2077,1497,771,1793,1962],
  "0903": [973,1602,1038,2579,2400,1263,1869,1241,861,1745,1492,2536,2346,2262,1490,787,254,1020,1022,1027],
  "0904": [1420,2447,1614,2163,1205,1326,603,80,2393,1186,2213,979,1523,2202,461,1890,2286,499,1504,1149],
  "0905": [328,1123,2467,1217,1276,1451,1209,1053,2450,2483,1853,1562,2292,1143,1832,337,1429,141,405,780],
  "0906": [1775,661,1938,2252,1509,1800,2526,1373,1781,185,2257,37,855,2307,2124,525,1247,240,2017,2250],
  "0907": [934,747,1573,539,1383,4,1478,1080,1218,1051,942,1262,263,1705,2291,580,866,541,811,492],
  "0908": [887,1349,593,796,2226,1863,2490,985,2018,1164,1781,487,1770,1233,1611,1643,1499,738,2061,1589],
  "0909": [1976,2478,1981,1035,1612,419,591,1902,698,2443,2209,605,743,2595,147,664,1886,1400,154,866],
  "0910": [2009,1929,1018,1049,2010,193,1220,6,544,707,1421,1199,2105,947,1787,2034,48,1329,405,2143],
  "0911": [912,2114,1283,1880,1499,1898,960,2527,914,1757,310,1166,1748,1392,1463,1555,2326,1611,1366,2494],
  "0912": [2299,1192,573,654,982,2417,876,140,105,2430,1343,1904,940,261,799,126,2097,1875,1081,1765],
  "0913": [1379,69,1359,334,2362,1790,1915,2336,2600,430,1526,2052,523,504,987,807,82,249,2242,2266],
  "0914": [1316,89,891,611,1737,491,2498,1462,39,333,2054,2210,2158,2314,1580,1995,1878,158,1051,2509],
  "0915": [968,30,1174,1324,1138,806,543,172,90,1688,970,1985,143,558,1236,761,1474,2070,1001,1766],
  "0916": [1580,640,2126,334,470,872,2276,2401,2530,1966,2093,113,243,602,987,951,1629,2231,1264,1194],
  "0917": [382,866,1586,2282,2544,2202,1959,230,1562,1358,1121,445,1415,915,1282,2320,621,992,2087,2329],
  "0918": [407,553,2564,2266,472,10,2360,519,370,121,162,2091,1237,1399,155,310,752,2036,1479,887],
  "0919": [1115,996,1562,153,1194,1021,1889,2032,1063,2201,895,2311,60,1950,1344,99,2280,1367,1910,1823],
  "0920": [1235,2560,2166,2476,2453,2300,2004,1080,2008,2460,144,843,865,1146,17,1312,1254,170,769,278],
  "0921": [644,1951,1888,808,2380,286,1452,670,2020,1142,1841,1833,175,2290,896,2035,202,1401,2062,2000],
  "0922": [1049,2222,2089,734,299,1854,905,2282,1395,2060,1486,192,2232,2313,859,421,2357,739,270,283],
  "0923": [863,1090,430,1519,940,412,2006,1459,357,511,1658,31,2001,790,129,917,1403,86,833,1801],
  "0924": [1030,689,1106,993,1655,1044,603,2277,168,1015,1614,795,1647,877,1818,2235,2506,1649,2148,697],
  "0925": [201,2208,202,1597,463,2452,784,2017,1346,747,910,775,1294,1095,538,1751,2086,1941,286,863],
  "0926": [1987,73,1543,1355,900,132,858,1450,1568,931,681,1124,1314,2071,793,1103,2554,1526,2137,466],
  "0927": [1966,1905,1745,509,1853,1796,1984,1429,1911,1040,2440,1802,1431,2018,650,806,1683,1985,539,2239],
  "0928": [1540,1401,1177,909,2013,1906,657,2111,893,988,1890,1000,1940,2186,2203,1455,676,2001,1689,2454],
  "0929": [541,579,1916,566,146,1286,2470,500,1517,530,698,934,1849,59,2012,1895,325,1800,707,842],
  "0930": [2076,2018,2375,2541,793,1731,1009,769,2599,875,2104,2507,418,1922,1239,1928,2208,1520,2269,1201],
  "1001": [1448,272,426,847,1620,295,2311,902,2385,1580,214,2457,931,1303,1367,551,1864,541,557,257],
  "1002": [501,2087,656,1772,1147,194,26,1378,1480,1283,2280,63,1903,1245,2537,332,298,582,1328,1577],
  "1003": [142,1181,1356,747,840,1152,984,1278,171,72,1831,373,380,1610,1335,527,963,608,1625,1125],
  "1004": [1051,2398,1558,1549,273,391,2371,2147,66,1939,2444,1686,1390,69,136,584,1598,1071,1211,1761],
  "1005": [1205,2517,2037,1132,1873,1197,793,249,843,1383,991,282,413,697,125,1763,1574,1463,2233,2180],
  "1006": [624,103,151,1124,1221,1583,192,920,2276,1312,1937,1994,1685,1225,1422,45,875,1810,2191,1170],
  "1007": [1956,2202,1168,2291,261,1767,699,957,1495,623,2510,1903,921,2506,519,542,1852,418,2267,1200],
  "1008": [2061,1435,1554,1821,1113,908,516,155,50,13,715,1710,1089,1614,2296,2236,91,1124,1657,2127],
  "1009": [279,1267,1347,2445,295,1851,1943,2524,554,788,923,153,1309,2569,2038,1596,2203,1788,2310,2581],
  "1010": [701,2074,1169,1829,2247,156,1595,841,1419,1057,1303,34,2547,1353,2580,135,1790,209,2185,1855],
  "1011": [734,2238,1784,1615,2296,205,579,1798,2519,1442,2129,721,2092,346,1043,792,1612,723,155,1521],
  "1012": [2266,467,1477,2000,202,291,2263,915,2403,1496,495,1153,2529,2472,787,1283,1231,1068,944,2186],
  "1013": [973,1502,1371,1358,301,1492,234,2316,216,847,109,1048,2397,303,1080,1194,1680,2432,1945,783],
  "1014": [848,1272,2216,2175,2253,325,2494,279,879,943,2592,2025,9,1499,1144,2043,475,2111,294,1558],
  "1015": [905,288,400,134,1110,2225,1318,1152,649,1219,1665,410,1055,228,1706,1466,298,1249,1288,332],
  "1016": [891,251,662,1790,1322,2265,543,1020,2367,2327,2459,1940,2069,54,770,1980,2351,1245,2580,2336],
  "1017": [412,672,98,1451,1140,272,2252,797,1628,2292,1605,194,108,527,1169,598,2391,2360,1273,1298],
  "1018": [2451,418,2318,1608,2333,1446,584,1627,1554,314,403,1072,1310,1314,738,2263,47,2032,454,1912],
  "1019": [205,1980,1706,974,469,2121,1617,1469,2005,638,1420,2166,1421,2029,1828,2176,14,663,926,1138],
  "1020": [1954,135,1571,1002,143,2131,1867,1096,1161,1776,2449,2219,376,1381,1292,1288,416,656,1842,1369],
  "1021": [664,278,1048,655,653,2598,1510,2478,2511,605,1128,1264,2408,1621,787,1203,1284,1986,893,2570],
  "1022": [1451,2368,1575,833,1474,1000,141,135,2574,2035,522,1620,1769,1217,1828,1550,79,1114,430,2485],
  "1023": [718,1091,1834,974,721,681,1547,1914,2289,2142,1377,20,1794,1045,1987,719,1869,628,2398,155],
  "1024": [101,2491,63,1438,2081,1219,2290,595,397,1554,1013,1642,707,1320,2004,1562,945,591,2101,2354],
  "1025": [1591,1538,2352,660,1029,1518,2504,417,2296,2197,904,868,1231,2097,1944,2583,2242,1075,584,1993],
  "1026": [542,1665,1344,1332,1611,1996,529,729,104,815,733,1533,1636,358,31,1319,2100,395,305,646],
  "1027": [311,900,1958,631,1630,437,2422,321,285,2072,74,271,1535,1368,2159,2201,1348,325,864,1242],
  "1028": [2020,861,1713,1880,1147,312,216,2298,1027,546,1771,1673,1245,2495,199,2540,27,2276,963,2152],
  "1029": [1437,2421,2479,1829,1863,1598,1894,1211,1392,1339,2185,1292,278,2066,1214,190,1893,1660,330,735],
  "1030": [2260,1,593,762,473,2508,846,149,2337,2333,1330,787,1578,1859,1172,1450,2102,2553,1727,1182],
  "1031": [1118,1354,2209,1185,32,427,1993,302,2380,250,20,329,1896,500,2193,1246,1308,423,754,845],
  "1101": [1092,1097,1125,350,2327,2403,1941,2093,859,658,1391,2461,2402,2262,470,2333,1953,84,886,706],
  "1102": [150,2134,1740,1939,2039,418,1451,1834,547,1900,1446,431,1123,2517,1286,2030,1171,1455,973,2530],
  "1103": [1392,1269,491,1066,845,1768,1561,2411,388,2368,1644,2071,315,1730,1386,2176,2275,63,2250,37],
  "1104": [764,2043,443,1146,988,599,1942,2374,1494,689,1888,2502,897,991,2080,999,2202,1607,2122,65],
  "1105": [1845,1297,540,146,674,2136,2226,1683,1727,706,33,395,555,869,1179,382,1463,2334,611,2052],
  "1106": [102,2127,1371,1986,1239,1553,124,564,872,65,1375,1898,1105,2461,246,2449,2595,1504,1545,1928],
  "1107": [2205,1530,1005,671,1322,2568,1395,1086,1180,658,2190,2577,1380,1647,1338,2324,493,2294,970,2498],
  "1108": [1627,1512,1545,2330,1736,1372,1808,331,562,1608,2557,13,2281,1576,752,1874,306,2242,70,2192],
  "1109": [157,840,634,88,928,305,2132,2311,538,73,351,1330,757,189,1531,784,911,1867,534,841],
  "1110": [2025,2015,471,2027,2192,1820,385,673,1129,543,1872,86,2536,533,2099,1732,1764,2040,1657,1078],
  "1111": [2100,2349,876,1821,658,1345,2280,423,916,484,302,2179,1147,2039,729,721,1085,127,329,2366],
  "1112": [619,569,1408,60,1771,1265,2495,814,880,1981,1190,1527,1517,1400,1401,2554,1534,403,1643,37],
  "1113": [144,380,422,1944,1531,870,2192,1086,2176,1366,530,2031,2474,13,1096,1258,142,1780,1660,1600],
  "1114": [1544,839,1249,499,801,1854,268,1562,1797,574,521,388,1573,936,2258,842,823,2580,2326,2179],
  "1115": [2306,547,2232,1816,1663,963,655,250,1029,1022,2275,351,1074,1118,2528,194,199,674,1847,138],
  "1116": [1300,570,2064,2438,1404,1536,1099,738,1454,1996,1783,1592,540,2483,2554,1423,2433,765,2591,2049],
  "1117": [1975,76,1257,772,1919,512,321,909,1651,834,1522,251,1851,2315,752,1191,2274,2517,16,2002],
  "1118": [2471,1622,221,1077,2311,1564,440,808,1216,2557,2536,102,698,1597,276,2225,1381,1125,614,2069],
  "1119": [187,171,939,1611,1718,1900,476,2584,2014,207,1645,2344,1591,1761,2138,2015,1847,2314,747,2539],
  "1120": [1855,1139,1609,1806,2003,162,2532,2441,1088,1285,108,942,1967,113,1783,285,1092,2416,2503,1491],
  "1121": [2226,919,1434,287,1192,1789,855,734,1204,1748,2258,2205,1060,1224,845,1995,1501,407,1890,1565],
  "1122": [576,1599,1200,337,1244,2561,1993,1278,2018,194,1407,2231,1734,1625,1743,830,136,2223,2007,1329],
  "1123": [1232,469,1283,938,894,2380,1239,2442,2276,1854,1121,2188,800,2328,1449,1976,1978,2004,64,882],
  "1124": [1716,910,1515,1551,42,718,2008,708,2143,526,2315,783,867,189,896,1867,2000,944,2202,126],
  "1125": [0,36,380,426,608,2138,1210,822,1207,1940,2104,2595,734,257,1013,164,1980,997,765,842],
  "1126": [918,1172,294,1429,1760,26,2570,11,2383,1843,559,2252,1841,499,1274,635,2027,324,2190,1135],
  "1127": [2157,1953,775,827,1259,855,1943,2579,1793,648,781,530,487,2489,809,336,1373,1233,134,1283],
  "1128": [2466,1735,2166,1476,887,518,1906,181,1421,1054,2170,1797,1142,324,2128,279,1458,1646,312,2140],
  "1129": [1807,26,1350,938,2590,601,2270,471,189,1218,737,2068,1355,195,335,208,1602,861,2409,1874],
  "1130": [794,222,1636,280,1013,2291,374,1506,395,2174,159,261,1158,492,1474,1314,1756,1176,592,493],
  "1201": [1366,2579,758,2222,1764,1898,611,2236,2462,1315,2162,79,1747,32,1769,2268,1618,990,1586,779],
  "1202": [2087,500,2362,2594,476,1736,809,72,1645,1205,2536,71,242,1564,21,195,2573,1079,1204,1379],
  "1203": [429,1312,432,2349,843,1107,1259,1141,1751,2520,529,1184,573,2433,784,64,2320,841,1394,2481],
  "1204": [2261,1106,1387,1242,546,1023,987,825,1061,1386,1647,1727,483,1544,1563,1056,1902,148,977,2526],
  "1205": [1542,2417,812,1123,2306,1280,291,448,2432,2017,431,2523,309,635,891,160,1348,856,2439,2353],
  "1206": [1082,2575,470,1578,35,330,370,1593,420,329,196,456,1169,1116,783,1865,814,1114,152,2271],
  "1207": [1430,2503,2559,361,2323,2470,204,771,1446,2169,2156,1520,1766,957,2326,2544,2309,1029,1307,1615],
  "1208": [1176,134,1102,1221,948,2046,1157,1014,1622,1853,2052,1643,1959,1813,1300,2325,2335,1006,2554,1255],
  "1209": [2499,2406,1753,1932,2507,855,634,1318,2432,1122,1029,281,2033,1276,2427,796,1395,1295,2467,991],
  "1210": [1201,1456,636,884,1086,1979,2378,1769,2115,2228,542,666,2237,347,1732,933,846,2593,1814,2476],
  "1211": [91,1202,1450,497,762,358,2438,256,1723,90,2345,824,757,656,940,1539,1995,1953,290,1909],
  "1212": [2596,2437,101,2049,1715,2025,596,1187,2329,224,1592,1799,2556,671,2163,2587,1318,1478,223,1025],
  "1213": [1630,1830,6,605,650,448,1949,539,2073,904,1746,435,1912,2114,372,1735,1395,2247,1321,338],
  "1214": [1050,647,1458,1852,2498,2069,1430,365,866,1452,1297,1999,611,2278,221,1471,2249,2420,482,1966],
  "1215": [1658,1934,2135,1675,1671,2439,2112,1060,2230,773,2010,1145,1265,214,144,1959,1168,786,1917,255],
  "1216": [984,850,1151,797,2018,1221,717,2436,1704,2520,2273,677,1410,602,1271,1017,546,1133,2111,1799],
  "1217": [1823,1464,560,1879,5,2310,1556,1632,2408,1554,33,2551,2193,28,1097,2592,1497,180,2320,1701],
  "1218": [1502,2214,2127,1392,2213,989,224,1292,593,638,896,1141,2482,8,2471,774,1349,1189,2116,2179],
  "1219": [1839,2592,626,950,1951,2261,2564,1003,2467,1109,874,881,254,2223,790,1311,2549,326,888,1026],
  "1220": [164,1790,243,1477,332,513,2195,2045,1674,1323,39,2432,1656,1085,2345,1835,1631,1752,308,554],
  "1221": [105,2370,2559,1577,1494,1124,893,83,2069,1510,1065,846,1630,265,2004,369,2007,2211,862,254],
  "1222": [1264,1076,1890,1396,1832,1808,2142,138,244,1502,2077,775,553,480,2531,1982,1357,2016,2498,2434],
  "1223": [2427,586,1966,1835,1266,891,1393,2555,694,922,2518,2357,1910,2173,921,1350,1326,1279,1774,439],
  "1224": [2458,236,2029,2217,2134,1127,2579,963,945,2221,2503,405,1184,1162,156,29,1654,1013,970,1775],
  "1225": [2298,363,2325,1025,263,2531,538,1285,1573,2403,1739,2278,1979,2099,600,2570,2237,1834,676,799],
  "1226": [51,428,1308,837,774,2318,1668,782,1107,1326,27,1273,303,640,1615,1185,2068,15,2470,1886],
  "1227": [1717,1791,2245,1520,1980,958,2512,793,1102,364,549,2174,773,1767,1148,2177,1266,2009,255,2557],
  "1228": [1728,90,1765,830,1876,1634,1014,1902,1176,2190,1903,1729,841,2399,250,717,1715,186,940,178],
  "1229": [2191,216,1722,1672,1085,242,2310,644,1495,1088,1027,748,1369,833,1918,1944,1478,3,2,2344],
  "1230": [2583,233,994,1387,410,862,677,1380,1075,1273,164,927,2428,565,2188,2138,1422,321,568,2468],
  "1231": [2354,1217,1471,339,2133,406,383,315,71,226,1341,2160,523,224,1724,305,1996,2525,2235,2058]
}