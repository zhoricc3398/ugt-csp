var tab_headerContainer = document.getElementsByClassName('fixed-top')[0];
var tab_headerPlaceholder = document.createElement('div');
    tab_headerPlaceholder.classList.add('ugt-tab-header');
var tab_elemContainer = `<ul>
                <li><a href='https://ugt.ge/'>ugt</a></li>
                <li><a href='https://ugtcloud.ge/'>service</a></li>
                <li><a href='https://cloud.ugt.ge/' class="active">online shopping</a></li>
            </ul>`;
tab_headerPlaceholder.innerHTML = tab_elemContainer;
tab_headerContainer.appendChild(tab_headerPlaceholder);