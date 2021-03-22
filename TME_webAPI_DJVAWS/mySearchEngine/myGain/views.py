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
from rest_framework.response import Response

# Create your views here.

# Create your views here.
class Utilities():
    def get_object(id):
        try:
            # today = date.today()
            # today.strftime("%Y-%m-%d"):
            return Gain.objects.get(tigId=id)
        except Gain.DoesNotExist: 
            return False

#Met à jour la table des gains lors d'une decrementation de la quantité d'un produit

class AddGain():
    def add(id,quantity,totalPrice):
        print(totalPrice)
    
        prod = Utilities.get_object(id)
        if quantity >= 0 and totalPrice >= 0:
            prod.quantity = prod.quantity + quantity 
            print(prod.totalPrice,'total')
            if totalPrice == 0:
                prod.totalPrice = prod.totalPrice + 0
                prod.isSale = 0
            else:
                prod.totalPrice = prod.totalPrice + totalPrice
                prod.isSale = 1
            prod.save()
            response = {}
            response['message'] = 'Cout ajouté'
            response['id'] = id
            return True
        else:
            return False
        # else:
        #     if quantity >= 0 and totalPrice >=0:
        #         serializer = CostSerializer(data={'tigId':str(id),'quantity':quantity,'totalPrice':totalPrice})
        #         if serializer.is_valid():
        #             serializer.save()
        #             return True
        #     else:
        #         return False

#Obtenir le coùt annuelle pour une année donnée
class TotalGainPerYear(APIView):

    def get(self,request,year):
        prods = Gain.objects.all()
        totalGainPerYear = 0
        if prods:
            for prod in prods:
                if prod.created.today().year == year:
                    totalGainPerYear += prod.totalPrice
                
            response = {}
            response['message']= 'Le coût total est :'
            response['totalGainPerYear']= totalGainPerYear
            return Response(response,status=200)
        else:
            erreur = {}
            erreur['message'] = 'Aucunes données trouvées'
            return Response(erreur,status=404)


class TheMostSale(APIView):

    def get(self,request):
        prods = Gain.objects.all()
        maxQuantity = 0
        mostSaleId = 0
        if prods:
            for prod in prods:
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
        gains = Gain.objects.all()
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
            # response['time'] = datetime.now
            return Response(response,status=200) 
        else:
            response = {}
            response['message']= "Aucun impot à payer cette année !"
            return Response(response,status=200)







