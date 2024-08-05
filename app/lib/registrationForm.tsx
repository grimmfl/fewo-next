import React from 'react';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';
import { reservation } from "@prisma/client";
import { currency } from "@/app/lib/currency";

// Create styles
const styles = StyleSheet.create({
                                   page: {
                                     backgroundColor: '#FFFFFF',
                                     fontSize: 10,
                                     padding: 30,
                                     lineHeight: 1.3,
                                   },
                                   section: {
                                     flexDirection: 'row',
                                     justifyContent: 'space-between',
                                   },
                                   flex_row: {
                                     flexDirection: 'row',
                                   },
                                   flex_col: {
                                     flexDirection: "column"
                                   },
                                   own_address: {
                                     textAlign: "right"
                                   },
                                   text_right: {
                                     display: "flex",
                                     alignSelf: "flex-end"
                                   },
                                   text_bold: {
                                     fontFamily: "Helvetica-Bold"
                                   },
                                   text_large: {
                                     fontSize: 13
                                   }
                                 });


export type RegistrationFormData = {
  DateFrom: string;
  DateTo: string;
  Name: string;
  Street: string;
  HouseNumber: string;
  PostalCode: string;
  City: string;
  Country: string;
  Count: string;
  CompanyName: string;
  CompanyAddress: string;
  Nationality: string;
  IsSameAsNormal: string;
};


// Create Document Component
export const RegistrationForm = ({ data }: { data: RegistrationFormData }) => (
  <Document>
    <Page size="A4" style={ styles.page }>
      <View style={ [styles.section, { justifyContent: "space-between" }] }>
        <Text style={ styles.text_bold }>Meldeschein / registration form</Text>
        <Text>Ferienwohnung Grimm | Mühlstraße 4 | 63579 Freigericht</Text>
      </View>

      <View style={ [styles.section, { marginTop: 20 }] }>
        <View style={ {} }>
          <View style={ [styles.flex_row] }>
            <Text style={ [styles.text_bold, {
              paddingLeft: 6, width: 205, paddingVertical: 10, border: 1, borderColor: "black",
              paddingTop: 10
            }] }>Privatanschrift / home address</Text>
            <View style={ [styles.flex_row, {
              paddingHorizontal: 6, width: 205, paddingVertical: 10, border: 1,
              borderColor: "black",
              paddingTop: 10, borderLeft: 0, justifyContent: "space-between"
            }] }>
              <View style={ [styles.flex_col, styles.text_bold] }>
                <Text>Datum Anreise /</Text>
                <Text>date of arrival</Text>
              </View>
              <Text>{ data.DateFrom }</Text>
            </View>
            <View style={ [styles.flex_row, {
              paddingHorizontal: 6, width: 205, paddingVertical: 10, border: 1,
              borderColor: "black",
              paddingTop: 10, borderLeft: 0, justifyContent: "space-between"
            }] }>
              <View style={ [styles.flex_col, styles.text_bold] }>
                <Text>Datum Abreise /</Text>
                <Text>date of departure</Text>
              </View>
              <Text>{ data.DateTo }</Text>
            </View>
          </View>
          <View style={ [styles.flex_row] }>
            <Text style={ [styles.text_bold, {
              paddingLeft: 6, width: 205, paddingVertical: 10, border: 1, borderColor: "black",
              paddingTop: 10, borderTop: 0
            }] }>Name / name</Text>
            <Text style={ [{
              paddingLeft: 6, width: 410, paddingVertical: 10, border: 1, borderColor: "black",
              paddingTop: 10, borderTop: 0, borderLeft: 0
            }] }>{ data.Name }</Text>
          </View>
          <View style={ [styles.flex_row] }>
            <Text style={ [styles.text_bold, {
              paddingLeft: 6, width: 205, paddingVertical: 10, border: 1, borderColor: "black",
              paddingTop: 10, borderTop: 0
            }] }>Straße, Nr. / street</Text>
            <Text style={ [{
              paddingLeft: 6, width: 410, paddingVertical: 10, border: 1, borderColor: "black",
              paddingTop: 10, borderTop: 0, borderLeft: 0
            }] }>{ data.Street } { data.HouseNumber }</Text>
          </View>
          <View style={ [styles.flex_row] }>
            <Text style={ [styles.text_bold, {
              paddingLeft: 6, width: 205, paddingVertical: 10, border: 1, borderColor: "black",
              paddingTop: 10, borderTop: 0
            }] }>PLZ, Ort / postal code, city</Text>
            <Text style={ [{
              paddingLeft: 6, width: 205, paddingVertical: 10, border: 1, borderColor: "black",
              paddingTop: 10, borderTop: 0, borderLeft: 0
            }] }>{ data.PostalCode } { data.City }</Text>
            <Text style={ [{
              paddingLeft: 6, width: 125, paddingVertical: 10, border: 1, borderColor: "black",
              paddingTop: 10, borderTop: 0, borderLeft: 0
            }] }>Land / country</Text>
            <Text style={ [{
              paddingLeft: 6, width: 80, paddingVertical: 10, border: 1, borderColor: "black",
              paddingTop: 10, borderTop: 0, borderLeft: 0
            }] }>{ data.Country }</Text>
          </View>
          <View style={ [styles.flex_row] }>
            <Text style={ [styles.text_bold, {
              paddingLeft: 6, width: 205, paddingVertical: 10, border: 1, borderColor: "black",
              paddingTop: 10, borderTop: 0
            }] }>Staatsangehörigkeit / nationality</Text>
            <Text style={ [{
              paddingLeft: 6, width: 125, paddingVertical: 10, border: 1, borderColor: "black",
              paddingTop: 10, borderTop: 0, borderLeft: 0
            }] }>{ data.Nationality }</Text>
            <Text style={ [{
              paddingLeft: 6, width: 205, paddingVertical: 10, border: 1, borderColor: "black",
              paddingTop: 10, borderTop: 0, borderLeft: 0
            }] }>Passnummer / passport number</Text>
            <Text style={ [{
              paddingLeft: 6, width: 80, paddingVertical: 10, border: 1, borderColor: "black",
              paddingTop: 10, borderTop: 0, borderLeft: 0
            }] }></Text>
          </View>
          <View style={ [styles.flex_row] }>
            <Text style={ [styles.text_bold, {
              paddingLeft: 6, width: 205, paddingVertical: 10, border: 1, borderColor: "black",
              paddingTop: 10, borderTop: 0
            }] }>Geburtsdatum / date of birth</Text>
            <Text style={ [{
              paddingLeft: 6, width: 125, paddingVertical: 10, border: 1, borderColor: "black",
              paddingTop: 10, borderTop: 0, borderLeft: 0
            }] }></Text>
            <View style={ [styles.flex_col, {
              paddingLeft: 6, width: 205, paddingVertical: 10, border: 1, borderColor: "black",
              paddingTop: 10, borderTop: 0, borderLeft: 0
            }] }>
              <Text>Anzahl der Mitreisenden /</Text>
              <Text>number of accompanying persons</Text>
            </View>
            <Text style={ [{
              paddingLeft: 6, width: 80, paddingVertical: 10, border: 1, borderColor: "black",
              paddingTop: 10, borderTop: 0, borderLeft: 0
            }] }>{ data.Count }</Text>
          </View>
        </View>
      </View>

      <View style={[styles.section, { marginTop: 30, paddingLeft: 6, width: 535, paddingVertical: 10, border: 1, borderColor: "black",
        paddingTop: 10}]}>
        <Text>Unterschrift des Gastes / signature</Text>
      </View>



      <View style={ [styles.section, { marginTop: 20 }] }>
        <View style={ {} }>
          <View style={ [styles.flex_row] }>
            <View style={ [styles.flex_col, styles.text_bold, {
              paddingLeft: 6, width: 205, paddingVertical: 10, border: 1, borderColor: "black",
              paddingTop: 10
            }] }>
              <Text>Rechnungsanschrift /</Text>
              <Text>billing address</Text></View>
            <View style={ [styles.flex_row, {
              paddingHorizontal: 6, width: 410, paddingVertical: 10, border: 1,
              borderColor: "black",
              paddingTop: 10, borderLeft: 0, justifyContent: "space-between"
            }] }>
              <View style={ [styles.flex_col, styles.text_bold] }>
                <Text>Die Privatanschrift stimmt mit der Rechnungsanschrift &uuml;berein /</Text>
                <Text>The home address matches the billing address</Text>
              </View>
              <Text>{ data.IsSameAsNormal }</Text>
            </View>
          </View>
          <View style={ [styles.flex_row] }>
            <Text style={ [styles.text_bold, {
              paddingLeft: 6, width: 205, paddingVertical: 10, border: 1, borderColor: "black",
              paddingTop: 10, borderTop: 0
            }] }>
              Firma / company
            </Text>
            <Text style={ [styles.flex_row, {
              paddingHorizontal: 6, width: 410, paddingVertical: 10, border: 1,
              borderColor: "black",
              paddingTop: 10, borderLeft: 0, justifyContent: "space-between", borderTop: 0
            }] }>
              { data.CompanyName }
            </Text>
          </View>
          <View style={ [styles.flex_row] }>
            <Text style={ [styles.text_bold, {
              paddingLeft: 6, width: 205, paddingVertical: 10, border: 1, borderColor: "black",
              paddingTop: 10, borderTop: 0
            }] }>
              Firmenadresse / company address
            </Text>
            <Text style={ [styles.flex_row, {
              paddingHorizontal: 6, width: 410, paddingVertical: 10, border: 1,
              borderColor: "black",
              paddingTop: 10, borderLeft: 0, justifyContent: "space-between", borderTop: 0
            }] }>
              { data.CompanyAddress }
            </Text>
          </View>
        </View>
      </View>
    </Page>
  </Document>
);
