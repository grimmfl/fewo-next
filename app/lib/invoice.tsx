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


export type InvoiceData = {
  BillingName: string,
  BillingStreet: string,
  BillingHouseNumber: string,
  BillingCity: string,
  BillingPostalCode: string,
  BillingCountry: string,
  InvoiceNumber: string,
  DateFrom: string,
  Name: string,
  DateValue: string,
  DateTo: string,
  Count: string,
  CountString: string,
  PriceString: string,
};


// Create Document Component
export const MyDocument = ({ data}: {data: InvoiceData}) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <View style={styles.flex_col}>
          <Text style={[styles.text_bold, styles.text_large, {marginBottom: 4}]}>Ferienwohnung Grimm</Text>
          <Text>Ferienwohnung - Monteurwohnung</Text>
        </View>
        <View style={{ textAlign: "right", flexDirection: "column"}}>
          <View>
            <Text style={[styles.text_right, styles.text_bold]}>Ferienwohnung Grimm</Text>
            <Text style={styles.text_right}>Elke und Peter Grimm</Text>
            <Text style={styles.text_right}>Mühlstraße 4</Text>
            <Text style={styles.text_right}>63579 Freigericht</Text>
            <Text style={styles.text_right}>+49 6055-6302</Text>
            <Text style={styles.text_right}>info@fewogrimm.de</Text>
            <Text style={styles.text_right}>www.fewogrimm.de</Text>
          </View>
        </View>
      </View>

      <View style={styles.section}>
        <View>
          <Text style={styles.text_bold}>Rechnungsadresse</Text>
          <Text style={{marginTop: 4}}>{ data.BillingName }</Text>
          <Text>{ data.BillingStreet } {data.BillingHouseNumber}</Text>
          <Text>{ data.BillingPostalCode } {data.BillingCity}</Text>
          <Text>{ data.BillingCountry }</Text>
        </View>
      </View>

      <View style={[styles.section, { marginTop: 10}]}>
        <View>
          <Text style={[styles.text_bold, styles.text_large]}>Rechnung</Text>
          <View style={[styles.flex_row, {marginTop: 5 }]}>
            <Text style={styles.text_bold}>Rechnungsnummer</Text>
            <Text style={{position: "absolute", left: 115}}>{ data.InvoiceNumber }</Text>
            <Text style={[styles.text_bold, {position: "absolute", left: 300}]}>Datum</Text>
            <Text style={{position: "absolute", left: 415}}>{ data.DateValue }</Text>
          </View>
          <View style={[styles.flex_row, { width: 600, justifyContent: "space-between" }]}>
            <Text style={styles.text_bold}>Anreise</Text>
            <Text style={{position: "absolute", left: 115}}>{ data.DateFrom }</Text>
            <Text style={[styles.text_bold, {position: "absolute", left: 300}]}>Abreise</Text>
            <Text style={{position: "absolute", left: 415}}>{ data.DateTo }</Text>
          </View>
          <View style={[styles.flex_row, { width: 600, justifyContent: "space-between" }]}>
            <Text style={styles.text_bold}>Gastname</Text>
            <Text style={{position: "absolute", left: 115, width: 180}}>{ data.Name }</Text>
            <Text style={[styles.text_bold, {position: "absolute", width: 100, left: 300}]}>Personenzahl</Text>
            <Text style={{position: "absolute",left: 415}}>{ data.Count }</Text>
          </View>
        </View>
      </View>

      <View  style={[styles.section, { marginTop: 50}]}>
        <View style={{}}>
          <View style={[styles.flex_row]}>
            <Text style={[styles.text_bold, {paddingLeft: 4, width: 150, paddingVertical: 4, border: 1, borderColor: "black", paddingTop: 6}]}>Anzahl</Text>
            <Text style={[styles.text_bold, {paddingLeft: 4, width: 300, paddingVertical: 4, border: 1, borderColor: "black", paddingTop: 6, borderLeft: 0}]}>Beschreibung</Text>
            <Text style={[styles.text_bold, {paddingLeft: 4, width: 90, paddingVertical: 4, border: 1, borderColor: "black", paddingTop: 6, borderLeft: 0}]}>Preis</Text>
          </View>
          <View style={[styles.flex_row]}>
            <Text style={[{paddingLeft: 4, width: 150, paddingVertical: 4, border: 1, borderColor: "black", borderTop: 0}]}>{ data.CountString }</Text>
            <View style={[styles.flex_col, {paddingLeft: 4, width: 300, paddingVertical: 4, border: 1, borderColor: "black", borderTop: 0, borderLeft: 0}]}>
              <Text style={[]}>
                Ferienwohnung - Gartenstraße 17
              </Text>
              <Text style={[]}>
                2,5 Zimmer, Küche, Bad
              </Text>
            </View>
            <Text style={[{paddingLeft: 4, width: 90, paddingVertical: 4, border: 1, borderColor: "black", borderTop: 0, borderLeft: 0}]}>{ data.PriceString }</Text>
          </View>
        </View>
      </View>

      <View style={[styles.section, {marginTop: 40}]}>
        <View style={[styles.flex_col]}>
          <Text>Kein Ausweis der Umsatzsteuer aufgrund der Anwendung der Kleinunternehmerregelung (§ 19 UStG).</Text>
          <Text style={{marginTop: 15}}>Wir danken recht herzlich für ihren Besuch und wünschen Ihnen eine angenehme Heimreise</Text>
        </View>
      </View>
    </Page>
  </Document>
);
