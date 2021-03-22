from django.shortcuts import render
from rest_framework.views import APIView
from myGain.models import Gain
from myGain.serializers import GainSerializer
from myCost.models import Cost
from myCost.serializers import CostSerializer
from django.http import Http404
import json
import requests
from datetime import *
import datetime
from rest_framework.response import Response

# Create your views here.

# Create your views here.
class Utilities():
    def get_object_with_date(id):
        try:
            today = date.today()
            todaystr = today.strftime("%Y-%m-%d")
            return True, Gain.objects.get(created=todaystr,tigId=id)
        except Gain.DoesNotExist: 
            return False, todaystr

    def get_object(id):
        try:
            return Gain.objects.get(tigId=id)
        except Gain.DoesNotExist: 
            return False

#Met à jour la table des gains lors d'une decrementation de la quantité d'un produit

class AddGain():
    def add(id,quantity,totalPrice):
        prod = Utilities.get_object_with_date(id)
        if prod[0] is True:
            prod = prod[1]
            if quantity >= 0 and totalPrice >= 0:
                prod.quantity = prod.quantity + quantity 
                if totalPrice == 0:
                    prod.totalPrice = prod.totalPrice + 0
                    prod.isSale = 0
                else:
                    prod.totalPrice = prod.totalPrice + totalPrice
                    prod.isSale = 1
                prod.save()
                return True
        elif prod[0] is False:
            if quantity >= 0 and totalPrice > 0:
                serializer = GainSerializer(data={'tigId':str(id),'quantity':quantity,'totalPrice':totalPrice, 'created':prod[1], 'isSale':True})
                if serializer.is_valid():
                    serializer.save()
                    return True
            elif quantity >= 0 and totalPrice == 0:
                serializer = GainSerializer(data={'tigId':str(id),'quantity':quantity,'totalPrice':totalPrice, 'created':prod[1], 'isSale':False})
                if serializer.is_valid():
                    serializer.save()
                    return True
            

#Obtenir le coùt annuelle pour une année donnée
class TotalGainPerYear(APIView):

    def get(self,request,year):
        prods = Gain.objects.all()
        totalGainPerYear = 0
        if prods:
            for prod in prods:
                if prod.created[:4] == year:
                    totalGainPerYear += prod.totalPrice
                
            response = {}
            response['message']= 'Le coût total est :'
            response['totalGainPerYear']= totalGainPerYear
            return Response(response,status=200)
        else:
            erreur = {}
            erreur['message'] = 'Aucunes données trouvées'
            return Response(erreur,status=404)


class TheMostSaleForYear(APIView):

    def get(self,request,year):
        prods = Gain.objects.all()
        maxQuantity = 0
        mostSaleId = 0
        if prods:
            for prod in prods:
                if prod.created[:4] == year:
                    if prod.quantity > maxQuantity:
                        maxQuantity = prod.quantity
                        mostSaleId = prod.tigId

            response = {}
            response['message']= 'Le plus vendu :'
            response['mostSale']= maxQuantity
            response['id'] = mostSaleId
            return Response(response,status=200)
        else:
            erreur = {}
            erreur['message'] = 'Aucunes données trouvées'
            return Response(erreur,status=404)

class Test(APIView):

    def get(self,request,id):
        prods = Gain.objects.all()
        totalSold = 0

        if prods:
            for prod in prods:
                if prod.tigId == id:
                    totalSold += prod.quantity

        response = {}
        response['totalSold']= totalSold
        return Response(response,status=200)


class Impot(APIView):

    def getTotalGain(self):
        gains = Gain.objects.all()
        totalGain = 0
        for gain in gains:
            totalGain += gain.totalPrice
        return totalGain
    
    def getTotalCost(self):
        costs = Cost.objects.all()
        totalCost = 0
        for cost in costs:
            totalCost += cost.totalPrice
        return totalCost

    def get(self,request):
        totalCost = self.getTotalCost()
        totalGain = self.getTotalGain()
        total = totalGain - totalCost
        impot = 0

        if total > 0:
            impot = round(total * 0.3,2)
            response = {}
            response['message']= "L'impot est de :"
            response['impot']= impot
            response['gain'] = totalGain
            response['cost'] = totalCost
            return Response(response,status=200) 
        else:
            response = {}
            response['message']= "Aucun impot à payer cette année !"
            return Response(response,status=200)

class NumberArticleSale():

    def get(id):
        prods = Gain.objects.all()
        totalSold = 0

        if prods:
            for prod in prods:
                if prod.tigId == id:
                    totalSold += prod.quantity

        return totalSold







